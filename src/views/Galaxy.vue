<template lang="pug">
  md-layout

    md-dialog(ref="target")
      md-card.md-primary.card(v-bind:class="planet.class")
        md-card-header
          .md-title
            span {{ planet.name }}
            md-chip {{ planet.total | format }}
          .md-title(v-if="owner(planet)")
            md-chip(v-bind:class="faction(planet)") {{ owner(planet) }}
        md-card-media.system.planet
          .core
            img(v-bind:src="planet.image")
          .orbit(v-if="planet.moon || planet.station")
            img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="planet.moon")
            img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="planet.station")
        md-card-content.no-padding.center
          .subprogress
            span.left {{ 'resource.metal' | i18n }}
            span.right {{ planet.metal }} %
          md-progress(v-bind:md-progress="planet.metal")
          .subprogress
            span.left {{ 'resource.crystal' | i18n }}
            span.right {{ planet.crystal }} %
          md-progress(v-bind:md-progress="planet.crystal")
          .subprogress
            span.left {{ 'resource.oil' | i18n }}
            span.right {{ planet.oil }} %
          md-progress(v-bind:md-progress="planet.oil")
          .subprogress
            span.left {{ 'resource.size' | i18n }}
            span.right {{ planet.size }} %
          md-progress(v-bind:md-progress="planet.size")
          .subprogress
            span.left {{ 'resource.energy' | i18n }}
            span.right {{ planet.energy }} %
          md-progress(v-bind:md-progress="planet.energy")
          .subprogress
            span.left {{ 'resource.influence' | i18n }}
            span.right {{ planet.influence }} %
          md-progress(v-bind:md-progress="planet.influence")
        md-card-content(v-if="planet.moon || planet.station")
          md-chip(v-if="planet.moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="planet.station") {{ 'resource.station' | i18n }}
        md-card-content
          span {{ planet.description | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="battle()") {{ 'button.attack' | i18n }}

    md-dialog(ref="adventure")
      md-card.md-primary.card(v-bind:class="mission.class")
        md-card-header
          .md-title
            span {{ mission.name }}
        md-card-media.mission
          img(v-bind:src="mission.image")
        md-card-content
          md-chip.grey(v-for="ship in mission.Ships") {{ ship.MissionShip.quantity | format }} {{ ship.name | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="fight()") {{ 'button.attack' | i18n }}

    md-dialog(ref="battle")
      md-card.md-primary.card(v-bind:class="planet.class")
        form(v-on:submit.stop.prevent="attack()")
          md-card-header
            .md-title
              span {{ planet.name }}
              md-chip {{ planet.total | format }}
          md-card-media.system.planet
            .core
              img(v-bind:src="planet.image")
            .orbit(v-if="planet.moon || planet.station")
              img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="planet.moon")
              img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="planet.station")
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasFighter }")
              md-icon send
              label {{ 'ship.fighter.name' | i18n }} ({{ (player.fighter - fighter) | format }})
              md-input(type="number", v-model.number="fighter", min="0", v-bind:max="player.fighter", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasCruiser }")
              md-icon toys
              label {{ 'ship.cruiser.name' | i18n }} ({{ (player.cruiser - cruiser) | format }})
              md-input(type="number", v-model.number="cruiser", min="0", v-bind:max="player.cruiser", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasBomber }")
              md-icon bubble_chart
              label {{ 'ship.bomber.name' | i18n }} ({{ (player.bomber - bomber) | format }})
              md-input(type="number", v-model.number="bomber", min="0", v-bind:max="player.bomber", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") {{ 'button.attack' | i18n }}

    md-dialog(ref="fight")
      md-card.md-primary.card(v-bind:class="mission.class")
        form(v-on:submit.stop.prevent="quest()")
          md-card-header
            .md-title
              span {{ mission.name }}
          md-card-media.mission
            img(v-bind:src="mission.image")
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasFighter }")
              md-icon send
              label {{ 'ship.fighter.name' | i18n }} ({{ (player.fighter - fighter) | format }})
              md-input(type="number", v-model.number="fighter", min="0", v-bind:max="player.fighter", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasCruiser }")
              md-icon toys
              label {{ 'ship.cruiser.name' | i18n }} ({{ (player.cruiser - cruiser) | format }})
              md-input(type="number", v-model.number="cruiser", min="0", v-bind:max="player.cruiser", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasBomber }")
              md-icon bubble_chart
              label {{ 'ship.bomber.name' | i18n }} ({{ (player.bomber - bomber) | format }})
              md-input(type="number", v-model.number="bomber", min="0", v-bind:max="player.bomber", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") {{ 'button.attack' | i18n }}

    #map
</template>

<script>
  import L from 'leaflet'
  import 'leaflet.markercluster'
  import constants from '../config/constants'
  import notification from '../services/notification'
  import api from '../services/api'
  import store from '../vuex/store'
  
  export default {
    data () {
      return {
        map: null,
        system: null,
        missions: [],
        planet: {
          Player: {},
          Ships: []
        },
        mission: {
          Ships: []
        },
        galaxies: [
          'https://image.flaticon.com/icons/svg/190/190279.svg',
          'https://image.flaticon.com/icons/svg/139/139686.svg',
          'https://image.flaticon.com/icons/svg/167/167347.svg',
          'https://image.flaticon.com/icons/svg/124/124567.svg'
        ],
        warps: [
          [-45, -90],
          [-45, 90],
          [0, 0],
          [45, -90],
          [45, 90]
        ],
        fighter: 0,
        cruiser: 0,
        bomber: 0
      }
    },
    mounted () {
      store.commit('title', 'title.galaxy')
      this.universe()
      this.refresh()
    },
    sockets: {
      galaxy () {
        // this.close()
        this.refresh()
      }
    },
    methods: {
      universe () {
        // create map
        this.map = L.map('map', {
          zoomControl: false
        }).setView([-90 + Math.random() * 180, -180 + Math.random() * 360], 7 - this.zoom)
        // set bounds box
        var bounds = new L.LatLngBounds(new L.LatLng(90, -180), new L.LatLng(-90, 180))
        // prevent outside moves
        this.map.panInsideBounds(bounds, { animate: true })
        this.map.on('moveend', () => {
          this.map.panInsideBounds(bounds, { animate: true })
        })
        // fill with own tilelayer
        L.tileLayer(constants.tiles + '/{z}/{x}/{y}.jpg', {
          minZoom: 7 - this.zoom,
          maxZoom: 7,
          tms: true,
          maxBounds: bounds
        }).addTo(this.map)
        // create system cluster
        this.system = L.markerClusterGroup({
          showCoverageOnHover: false,
          chunkedLoading: true,
          animate: true,
          maxClusterRadius: 50,
          animateAddingMarkers: true,
          iconCreateFunction: (cluster) => {
            return L.icon({
              iconUrl: this.galaxies[Math.floor(Math.random() * this.galaxies.length)],
              iconSize: [52, 52],
              iconAnchor: [26, 26]
            })
          }
        }).addTo(this.map)
        // create wormholes
        this.warps.forEach((coordinates) => {
          this.map.addLayer(L.marker(coordinates, {
            icon: L.icon({
              iconUrl: 'https://image.flaticon.com/icons/svg/389/389104.svg',
              iconSize: [52, 52],
              iconAnchor: [26, 26]
            })
          }).on('click', (ev) => {
            this.map.setView(this.warps[Math.floor(Math.random() * this.warps.length)], 7)
          }))
        })
      },
      refresh () {
        // get all missions
        api.getMissions()
        .then((missions) => {
          this.missions = missions
          // remove all markers
          this.system.eachLayer((layer) => {
            this.system.removeLayer(layer)
          })
          // add all planets
          this.filtered.forEach((planet) => {
            this.system.addLayer(L.marker([planet.lat, planet.lng], {
              icon: L.icon({
                iconUrl: planet.image,
                iconSize: [26, 26],
                iconAnchor: [13, 13]
              })
            }).on('click', (ev) => {
              this.select(planet)
            }))
          })
          // add all missions
          this.missions.forEach((mission) => {
            this.system.addLayer(L.marker([mission.lat, mission.lng], {
              icon: L.icon({
                iconUrl: mission.image,
                iconSize: [26, 26],
                iconAnchor: [13, 13]
              })
            }).on('click', (ev) => {
              this.choose(mission)
            }))
          })
        })
      },
      target () {
        this.$refs['target'].open()
      },
      adventure () {
        this.$refs['adventure'].open()
      },
      battle () {
        this.close()
        this.$refs['battle'].open()
      },
      fight () {
        this.close()
        this.$refs['fight'].open()
      },
      close () {
        this.$refs['target'].close()
        this.$refs['adventure'].close()
        this.$refs['battle'].close()
        this.$refs['fight'].close()
      },
      clear () {
        this.fighter = 0
        this.cruiser = 0
        this.bomber = 0
      },
      select (planet) {
        this.planet = planet
        this.map.setView([planet.lat, planet.lng])
        this.target()
      },
      choose (mission) {
        this.mission = mission
        this.map.setView([mission.lat, mission.lng])
        this.adventure()
      },
      attack () {
        var battle = {
          PlayerId: store.state.player.id,
          MissionId: null,
          PlanetId: this.planet.id,
          fighter: this.fighter,
          cruiser: this.cruiser,
          bomber: this.bomber
        }
        api.startBattle(battle)
        .then((battle) => {
          notification.success('notification.galaxy.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.galaxy.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
      },
      quest () {
        var battle = {
          PlayerId: store.state.player.id,
          MissionId: this.mission.id,
          PlanetId: null,
          fighter: this.fighter,
          cruiser: this.cruiser,
          bomber: this.bomber
        }
        api.startBattle(battle)
        .then((battle) => {
          notification.success('notification.cantina.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.cantina.error')
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
    watch: {
      filtered () {
        this.refresh()
      }
    },
    computed: {
      player () {
        return store.state.player
      },
      zoom () {
        return this.player.zoom
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
        return this.player.Galaxy.slice(0, 10 + this.player.galaxy - 1).filter((planet) => {
          return planet.Player
            ? planet.Player.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
            : planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style src="../../node_modules/leaflet/dist/leaflet.css"></style>
<style src="../../node_modules/leaflet.markercluster/dist/MarkerCluster.css"></style>

<style lang="stylus">
  .leaflet-control-attribution
    display none !important
</style>

<style lang="stylus" scoped>
  #map
    width 100%
    height 100%
    background-color rgba(255, 0, 0, 0.0)
  .system
    display flex
    .core
      flex 2
    .orbit
      flex 1
      display flex
      flex-direction column
      img
        height 70px !important
</style>
