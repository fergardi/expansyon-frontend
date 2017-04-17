<template lang="pug">
  md-layout

    md-dialog(ref="info")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title
            span {{ selected.name }}
            md-chip {{ selected.total | format }}
          .md-title(v-if="owner(selected)")
            md-chip(v-bind:class="faction(selected)") {{ owner(selected) }}
        md-card-media.system
          .planet
            img(v-bind:src="selected.image")
          .orbit(v-if="selected.moon || selected.station")
            img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="selected.moon")
            img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="selected.station")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="selected.metal")
          md-progress(v-bind:md-progress="selected.crystal")
          md-progress(v-bind:md-progress="selected.oil")
          md-progress(v-bind:md-progress="selected.size")
          md-progress(v-bind:md-progress="selected.energy")
          md-progress(v-bind:md-progress="selected.influence")
        md-card-content.center(v-if="selected.moon || selected.station")
          md-chip(v-if="selected.moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="selected.station") {{ 'resource.station' | i18n }}
        md-card-content.center
          span {{ selected.description | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="battle()") {{ 'button.attack' | i18n }}

    md-dialog(ref="battle")
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="attack()")
          md-card-header
            .md-title
              span {{ selected.name }}
              md-chip {{ selected.total }}
          md-card-media.system
            .planet
              img(v-bind:src="selected.image")
            .orbit(v-if="selected.moon || selected.station")
              img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="selected.moon")
              img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="selected.station")
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasFighter }")
              md-icon send
              label {{ 'ship.fighter.name' | i18n }} ({{ (player.fighter - fighter) | format }})
              md-input(type="number", v-model="fighter", min="0", v-bind:max="player.fighter", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasCruiser }")
              md-icon toys
              label {{ 'ship.cruiser.name' | i18n }} ({{ (player.cruiser - cruiser) | format }})
              md-input(type="number", v-model="cruiser", min="0", v-bind:max="player.cruiser", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasBomber }")
              md-icon bubble_chart
              label {{ 'ship.bomber.name' | i18n }} ({{ (player.bomber - bomber) | format }})
              md-input(type="number", v-model="bomber", min="0", v-bind:max="player.bomber", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") {{ 'button.attack' | i18n }}

    #map
</template>

<script>
  import L from 'leaflet'
  import 'leaflet.markercluster'
  import notification from '../services/notification'
  import api from '../services/api'
  import store from '../vuex/store'
  
  export default {
    data () {
      return {
        map: null,
        system: null,
        selected: {
          Player: {}
        },
        galaxies: [
          'https://image.flaticon.com/icons/svg/190/190279.svg',
          'https://image.flaticon.com/icons/svg/139/139686.svg',
          'https://image.flaticon.com/icons/svg/167/167347.svg',
          'https://image.flaticon.com/icons/svg/124/124567.svg'
        ],
        fighter: 0,
        cruiser: 0,
        bomber: 0
      }
    },
    mounted () {
      store.commit('title', 'title.exploration')
      this.universe()
      this.refresh()
    },
    sockets: {
      exploration () {
        this.refresh()
      }
    },
    methods: {
      universe () {
        this.map = L.map('map', {
          zoomControl: false
        }).setView([0, 0], 2)
        var bounds = new L.LatLngBounds(new L.LatLng(90, -180), new L.LatLng(-90, 180))
        L.tileLayer('http://psousa.net/demos/zoom-images/eso/{z}/{x}/{y}.jpg', {
          center: bounds.getCenter(),
          minZoom: 2,
          maxZoom: 6,
          tms: true,
          maxBounds: bounds
        }).addTo(this.map)
        this.map.on('drag', () => {
          this.map.panInsideBounds(bounds, { animate: false })
        })
        this.system = L.markerClusterGroup({
          showCoverageOnHover: false,
          chunkedLoading: true,
          animate: true,
          maxClusterRadius: 50,
          iconCreateFunction: (cluster) => {
            return L.icon({
              iconUrl: this.galaxies[Math.floor(Math.random() * this.galaxies.length)],
              iconSize: [50, 50],
              iconAnchor: [50, 50]
            })
          }
        }).addTo(this.map)
      },
      refresh () {
        api.getUniverse()
        .then((planets) => {
          this.planets = planets
        })
        .then(() => {
          this.system.eachLayer((layer) => {
            this.system.removeLayer(layer)
          })
          this.planets.forEach((planet) => {
            this.system.addLayer(L.marker([planet.lat, planet.lng], {
              icon: L.icon({
                iconUrl: planet.image,
                iconSize: [25, 25],
                iconAnchor: [25, 25]
              })
            }).on('click', (ev) => {
              this.select(planet)
            }))
          })
        })
      },
      info () {
        this.$refs['info'].open()
      },
      battle () {
        this.close()
        this.$refs['battle'].open()
      },
      close () {
        this.$refs['info'].close()
        this.$refs['battle'].close()
      },
      clear () {
        this.fighter = 0
        this.cruiser = 0
        this.bomber = 0
      },
      select (planet) {
        this.selected = planet
        this.info()
      },
      attack () {
        var battle = {
          PlayerId: store.state.player.id,
          MissionId: null,
          PlanetId: this.selected.id,
          fighter: this.fighter,
          cruiser: this.cruiser,
          bomber: this.bomber
        }
        api.startBattle(battle)
        .then((battle) => {
          notification.success('notification.exploration.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.exploration.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
      },
      faction (planet) {
        return planet.Player
          ? planet.Player.Faction
            ? planet.Player.Faction.class
            : ''
          : ''
      },
      owner (planet) {
        return planet.Player
          ? planet.Player.name
          : null
      }
    },
    computed: {
      player () {
        return store.state.player
      },
      hasFighter () {
        return this.fighter <= this.player.fighter
      },
      hasCruiser () {
        return this.cruiser <= this.player.cruiser
      },
      hasBomber () {
        return this.bomber <= this.player.bomber
      },
      can () {
        return this.hasFighter && this.hasCruiser && this.hasBomber && (this.fighter > 0 || this.cruiser > 0 || this.bomber > 0)
      },
      search () {
        return store.state.search
      },
      filtered () {
        return this.player.Exploration.filter((planet) => {
          return planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style src="../../node_modules/leaflet/dist/leaflet.css"></style>
<style src="../../node_modules/leaflet.markercluster/dist/MarkerCluster.css"></style>

<style lang="stylus" scoped>
  #map
    width 100%
    height 100%
  .system
    display flex
    .planet
      flex 2
    .orbit
      flex 1
      display flex
      flex-direction column
      img
        height 70px !important
</style>
