<template lang="pug">
  .app

    md-snackbar(ref="alert", md-position="bottom center")
      span {{ notification.text | i18n }}
      md-button.md-dense(v-bind:class="notification.class", v-on:click.native="dismiss()") {{ 'button.close' | i18n }}

    md-whiteframe(md-elevation="8")
      md-toolbar#toolbar.md-dense.flex(v-if="!fullscreen")
        md-button.md-icon-button.toggler(v-on:click.native="left()")
          md-icon chevron_right
        h2.md-title.flex.center {{ title | i18n }}
        md-input-container.search.flex(v-bind:class="{ 'md-input-invalid': search !== '' }")
          md-icon search
          label {{ 'filter.search' | i18n }}
          md-input(type="text", v-model="search")
          span.md-error {{ 'filter.filtered' | i18n }}
          md-button.md-icon-button.md-dense(v-on:click.native="clear()")
            md-icon clear
        md-button.md-icon-button.toggler(v-on:click.native="right()")
          md-icon chevron_left

    md-sidenav.md-left.md-fixed(ref="left", v-if="!fullscreen")
      md-whiteframe(md-elevation="8")
        md-toolbar#left.md-account-header.center
          md-avatar.md-large
            img(src="https://image.flaticon.com/icons/svg/124/124582.svg")
          h2.md-title {{ 'title.left' | i18n }}

      md-list.md-dense.scrollable
        md-subheader.md-inset {{ 'subtitle.economy' | i18n }}
        md-list-item
          router-link(exact, to="/planetarium", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary language
            .md-list-text-container
              span {{ 'title.planetarium' | i18n }}
              span {{ 'subtitle.planetarium' | i18n }}
            md-chip {{ player.planetarium | format }}
        md-list-item
          router-link(exact, to="/market", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary shopping_basket
            .md-list-text-container
              span {{ 'title.market' | i18n }}
              span {{ 'subtitle.market' | i18n }}
            md-chip {{ player.market | format }}
        md-list-item
          router-link(exact, to="/store", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary store
            .md-list-text-container
              span {{ 'title.store' | i18n }}
              span {{ 'subtitle.store' | i18n }}
            md-chip {{ player.store | format }}

        md-subheader.md-inset {{ 'subtitle.strategy' | i18n }}
        md-list-item
          router-link(exact, to="/galaxy", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary public
            .md-list-text-container
              span {{ 'title.galaxy' | i18n }}
              span {{ 'subtitle.galaxy' | i18n }}
            md-chip {{ 10 + player.galaxy | format }}
        md-list-item
          router-link(exact, to="/relicarium", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary all_inclusive
            .md-list-text-container
              span {{ 'title.relicarium' | i18n }}
              span {{ 'subtitle.relicarium' | i18n }}
            md-chip {{ player.relicarium | format }}
        md-list-item
          router-link(exact, to="/temple", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary account_balance
            .md-list-text-container
              span {{ 'title.temple' | i18n }}
              span {{ 'subtitle.temple' | i18n }}
            md-chip {{ player.temple | format }}

        md-subheader.md-inset {{ 'subtitle.technology' | i18n }}
        md-list-item
          router-link(exact, to="/research", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary.flip dialpad
            .md-list-text-container
              span {{ 'title.research' | i18n }}
              span {{ 'subtitle.research' | i18n }}
            md-chip {{ player.research | format }}
        md-list-item
          router-link(exact, to="/hangar", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary build
            .md-list-text-container
              span {{ 'title.hangar' | i18n }}
              span {{ 'subtitle.hangar' | i18n }}
            md-chip {{ player.hangar | format }}
        md-list-item
          router-link(exact, to="/infrastructure", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary settings
            .md-list-text-container
              span {{ 'title.infrastructure' | i18n }}
              span {{ 'subtitle.infrastructure' | i18n }}
            md-chip {{ player.infrastructure | format }}
        md-list-item
          router-link(exact, to="/defense", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary track_changes
            .md-list-text-container
              span {{ 'title.defense' | i18n }}
              span {{ 'subtitle.defense' | i18n }}
            md-chip {{ player.defense | format }}

        md-subheader.md-inset {{ 'subtitle.diplomacy' | i18n }}
        md-list-item
          router-link(exact, to="/senate", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary gavel
            .md-list-text-container
              span {{ 'title.senate' | i18n }}
              span {{ 'subtitle.senate' | i18n }}
            md-chip {{ player.senate | format }}
        md-list-item
          router-link(exact, to="/census", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary group
            .md-list-text-container
              span {{ 'title.census' | i18n }}
              span {{ 'subtitle.census' | i18n }}
            md-chip {{ player.census | format }}
      
        //md-list-item
          router-link(exact, to="/guild", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary security
            .md-list-text-container
              span {{ 'title.guild' | i18n }}
              span {{ 'subtitle.guild' | i18n }}
            md-chip {{ player.guilds | format }}
        md-list-item
          router-link(exact, to="/transmission", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary wifi
            .md-list-text-container
              span {{ 'title.transmission' | i18n }}
              span {{ 'subtitle.transmission' | i18n }}
            md-chip {{ player.transmission | format }}

        md-subheader.md-inset {{ 'subtitle.language' | i18n }}
        md-list-item(v-on:click.native="localize('es')")
          md-avatar
            md-icon.md-primary translate
          .md-list-text-container
            span {{ 'language.spanish' | i18n }}
            span {{ 'subtitle.translate' | i18n }}
        md-list-item(v-on:click.native="localize('en')")
          md-avatar
            md-icon.md-primary translate
          .md-list-text-container
            span {{ 'language.english' | i18n }}
            span {{ 'subtitle.translate' | i18n }}

        md-subheader.md-inset {{ 'subtitle.account' | i18n }}
        md-list-item
          router-link(exact, to="/profile", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary settings
            .md-list-text-container
              span {{ 'title.profile' | i18n }}
              span {{ 'subtitle.profile' | i18n }}
        md-list-item
          router-link(exact, to="/help", v-on:click.native="collapse()")
            md-avatar
              md-icon.md-primary chrome_reader_mode
            .md-list-text-container
              span {{ 'title.help' | i18n }}
              span {{ 'subtitle.help' | i18n }}
        md-list-item(v-on:click.native="logout()")
          md-avatar
            md-icon.md-primary lock
          .md-list-text-container
            span {{ 'account.logout' | i18n }}
            span {{ 'subtitle.logout' | i18n }}

    md-sidenav.md-right.md-fixed(ref="right", v-if="!fullscreen")
      md-whiteframe(md-elevation="8")
        md-toolbar#right.md-account-header.center
          md-avatar.md-large
            img(src="https://image.flaticon.com/icons/svg/124/124555.svg")
          h2.md-title {{ 'title.right' | i18n }}
      md-list.md-dense.scrollable

        md-subheader.md-inset {{ 'subtitle.resources' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary apps
          .md-list-text-container
            span {{ 'resource.metal' | i18n }}
            span {{ 'subtitle.resource' | i18n }}
          md-chip.indigo {{ player.metal | format }} / {{ player.secure | format }}
        md-list-item
          md-avatar
            md-icon.md-primary texture
          .md-list-text-container
            span {{ 'resource.crystal' | i18n }}
            span {{ 'subtitle.resource' | i18n }}
          md-chip.purple {{ player.crystal | format }} / {{ player.secure | format }}
        md-list-item
          md-avatar
            md-icon.md-primary opacity
          .md-list-text-container
            span {{ 'resource.oil' | i18n }}
            span {{ 'subtitle.resource' | i18n }}
          md-chip.yellow {{ player.oil | format }} / {{ player.secure | format }}
        md-list-item
          md-avatar
            md-icon.md-primary home
          .md-list-text-container
            span {{ 'resource.size' | i18n }}
            span {{ 'subtitle.resource' | i18n }}
          md-chip.green {{ (player.infrastructure + player.defense) | format }} / {{ player.size | format }}
        md-list-item
          md-avatar
            md-icon.md-primary flash_on
          .md-list-text-container
            span {{ 'resource.energy' | i18n }}
            span {{ 'subtitle.resource' | i18n }}
          md-chip.cyan {{ player.hangar | format }} / {{ player.energy | format }}
        md-list-item
          md-avatar
            md-icon.md-primary star
          .md-list-text-container
            span {{ 'resource.influence' | i18n }}
            span {{ 'subtitle.resource' | i18n }}
          md-chip.red {{ player.influence | format }}
        md-list-item
          md-avatar
            md-icon.md-primary whatshot
          .md-list-text-container
            span {{ 'resource.aether' | i18n }}
            span {{ 'subtitle.resource' | i18n }}
          md-chip.pink {{ player.aether | format }}

        md-subheader.md-inset {{ 'subtitle.progress' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary school
          .md-list-text-container
            span {{ 'resource.experience' | i18n }}
            span {{ 'subtitle.skills' | i18n }}
          md-chip {{ player.experience | format }} / {{ (player.up * player.level) | format }}
        md-list-item
          md-avatar
            md-icon.md-primary share
          .md-list-text-container
            span {{ 'resource.level' | i18n }}
            span {{ 'subtitle.skills' | i18n }}
          md-chip {{ player.level | format }}

        md-subheader.md-inset {{ 'subtitle.referendum' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary apps
          .md-list-text-container
            span {{ 'resource.metal' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.metal >= 0 ? 'green' : 'red'") {{ player.Referendum.metal | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary texture
          .md-list-text-container
            span {{ 'resource.crystal' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.crystal >= 0 ? 'green' : 'red'") {{ player.Referendum.crystal | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary opacity
          .md-list-text-container
            span {{ 'resource.oil' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.oil >= 0 ? 'green' : 'red'") {{ player.Referendum.oil | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary home
          .md-list-text-container
            span {{ 'resource.size' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.size >= 0 ? 'green' : 'red'") {{ player.Referendum.size | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary flash_on
          .md-list-text-container
            span {{ 'resource.energy' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.energy >= 0 ? 'green' : 'red'") {{ player.Referendum.energy | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary star
          .md-list-text-container
            span {{ 'resource.influence' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.influence >= 0 ? 'green' : 'red'") {{ player.Referendum.influence | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary gps_fixed
          .md-list-text-container
            span {{ 'resource.attack' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.attack >= 0 ? 'green' : 'red'") {{ player.Referendum.attack | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary security
          .md-list-text-container
            span {{ 'resource.defense' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.defense >= 0 ? 'green' : 'red'") {{ player.Referendum.defense | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary fast_forward
          .md-list-text-container
            span {{ 'resource.speed' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.speed >= 0 ? 'green' : 'red'") {{ player.Referendum.speed | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary gps_not_fixed
          .md-list-text-container
            span {{ 'resource.aim' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.aim >= 0 ? 'green' : 'red'") {{ player.Referendum.aim | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary gps_off
          .md-list-text-container
            span {{ 'resource.evasion' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.evasion >= 0 ? 'green' : 'red'") {{ player.Referendum.evasion | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary dashboard
          .md-list-text-container
            span {{ 'resource.cargo' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.cargo >= 0 ? 'green' : 'red'") {{ player.Referendum.cargo | format }} %
        md-list-item
          md-avatar
            md-icon.md-primary school
          .md-list-text-container
            span {{ 'resource.experience' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Referendum.experience >= 0 ? 'green' : 'red'") {{ player.Referendum.experience | format }} %

        md-subheader.md-inset {{ 'subtitle.faction' | i18n }}
        md-list-item(v-if="player.Faction && player.Faction.metal > 0")
          md-avatar
            md-icon.md-primary apps
          .md-list-text-container
            span {{ 'resource.metal' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.metal | format }} %
        md-list-item(v-if="player.Faction && player.Faction.crystal > 0")
          md-avatar
            md-icon.md-primary texture
          .md-list-text-container
            span {{ 'resource.crystal' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.crystal | format }} %
        md-list-item(v-if="player.Faction && player.Faction.oil > 0")
          md-avatar
            md-icon.md-primary opacity
          .md-list-text-container
            span {{ 'resource.oil' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.oil | format }} %
        md-list-item(v-if="player.Faction && player.Faction.size > 0")
          md-avatar
            md-icon.md-primary home
          .md-list-text-container
            span {{ 'resource.size' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.size | format }} %
        md-list-item(v-if="player.Faction && player.Faction.energy > 0")
          md-avatar
            md-icon.md-primary flash_on
          .md-list-text-container
            span {{ 'resource.energy' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.energy | format }} %
        md-list-item(v-if="player.Faction && player.Faction.influence > 0")
          md-avatar
            md-icon.md-primary star
          .md-list-text-container
            span {{ 'resource.influence' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.influence | format }} %
        md-list-item(v-if="player.Faction && player.Faction.attack > 0")
          md-avatar
            md-icon.md-primary gps_fixed
          .md-list-text-container
            span {{ 'resource.attack' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.attack | format }} %
        md-list-item(v-if="player.Faction && player.Faction.defense > 0")
          md-avatar
            md-icon.md-primary security
          .md-list-text-container
            span {{ 'resource.defense' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.defense | format }} %
        md-list-item(v-if="player.Faction && player.Faction.speed > 0")
          md-avatar
            md-icon.md-primary fast_forward
          .md-list-text-container
            span {{ 'resource.speed' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.speed | format }} %
        md-list-item(v-if="player.Faction && player.Faction.aim > 0")
          md-avatar
            md-icon.md-primary gps_not_fixed
          .md-list-text-container
            span {{ 'resource.aim' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.aim | format }} %
        md-list-item(v-if="player.Faction && player.Faction.evasion > 0")
          md-avatar
            md-icon.md-primary gps_off
          .md-list-text-container
            span {{ 'resource.evasion' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.evasion | format }} %
        md-list-item(v-if="player.Faction && player.Faction.cargo > 0")
          md-avatar
            md-icon.md-primary dashboard
          .md-list-text-container
            span {{ 'resource.cargo' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.cargo | format }} %
        md-list-item(v-if="player.Faction && player.Faction.experience > 0")
          md-avatar
            md-icon.md-primary school
          .md-list-text-container
            span {{ 'resource.experience' | i18n }}
            span {{ 'subtitle.bonus' | i18n }}
          md-chip(v-bind:class="player.Faction.class") {{ player.Faction.experience | format }} %

        md-subheader.md-inset {{ 'subtitle.fleet' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary send
          .md-list-text-container
            span {{ 'ship.fighter.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.fighter | format }}
        md-list-item
          md-avatar
            md-icon.md-primary toys
          .md-list-text-container
            span {{ 'ship.cruiser.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.cruiser | format }}
        md-list-item
          md-avatar
            md-icon.md-primary bubble_chart
          .md-list-text-container
            span {{ 'ship.bomber.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.bomber | format }}
        md-list-item
          md-avatar
            md-icon.md-primary camera
          .md-list-text-container
            span {{ 'ship.orbiter.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.orbiter | format }}
        md-list-item
          md-avatar
            md-icon.md-primary widgets
          .md-list-text-container
            span {{ 'ship.carrier.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.carrier | format }}
        md-list-item
          md-avatar
            md-icon.md-primary cached
          .md-list-text-container
            span {{ 'ship.recycler.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.recycler | format }}

        md-subheader.md-inset {{ 'subtitle.building' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary apps
          .md-list-text-container
            span {{ 'building.furnace.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.furnace | format }}
        md-list-item
          md-avatar
            md-icon.md-primary texture
          .md-list-text-container
            span {{ 'building.factory.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.factory | format }}
        md-list-item
          md-avatar
            md-icon.md-primary opacity
          .md-list-text-container
            span {{ 'building.refinery.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.refinery | format }}
        md-list-item
          md-avatar
            md-icon.md-primary flash_on
          .md-list-text-container
            span {{ 'building.plant.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.plant | format }}
        md-list-item
          md-avatar
            md-icon.md-primary verified_user
          .md-list-text-container
            span {{ 'building.barrier.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.barrier | format }}
        md-list-item
          md-avatar
            md-icon.md-primary dashboard
          .md-list-text-container
            span {{ 'building.warehouse.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.warehouse | format }}

        md-subheader.md-inset {{ 'subtitle.tower' | i18n }}
        md-list-item
          md-avatar
            md-icon.md-primary gps_off
          .md-list-text-container
            span {{ 'tower.blaster.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.blaster | format }}
        md-list-item
          md-avatar
            md-icon.md-primary gps_not_fixed
          .md-list-text-container
            span {{ 'tower.railgun.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.railgun | format }}
        md-list-item
          md-avatar
            md-icon.md-primary gps_fixed
          .md-list-text-container
            span {{ 'tower.cannon.name' | i18n }}
            span {{ 'subtitle.quantity' | i18n }}
          md-chip {{ player.cannon | format }}

    .main.padding#main
      router-view.content.animation.fadeIn.scrollable
</template>

<script>
  import Vue from 'vue'
  import auth from './services/auth'
  import api from './services/api'
  import notification from './services/notification'
  import store from './vuex/store'

  export default {
    data () {
      return {
        search: store.state.search
      }
    },
    created () {
      store.watch((state) => state.notification, () => {
        if (store.state.account.logged) this.alert()
      })
    },
    methods: {
      localize (lang) {
        Vue.config.lang = lang
        this.collapse()
      },
      left () {
        this.$refs['left'].open()
      },
      right () {
        this.$refs['right'].open()
      },
      alert () {
        this.dismiss()
        this.$refs['alert'].open()
      },
      dismiss () {
        this.$refs['alert'].close()
      },
      collapse () {
        this.$refs['left'].close()
        this.$refs['right'].close()
      },
      clear () {
        this.search = ''
      },
      logout () {
        auth.logout()
        this.clear()
        this.collapse()
        this.$router.push('/login')
      }
    },
    sockets: {
      player (id) {
        if (store.state.account.logged && !this.fullscreen) {
          if (id === store.state.account.id || id === null) {
            api.getPlayer(store.state.account.id)
            .then((player) => {
              store.commit('player', player)
            })
          }
        }
      },
      galaxy () {
        notification.success('notification.galaxy.new')
      },
      senate () {
        notification.success('notification.senate.new')
      },
      market () {
        notification.success('notification.market.new')
      }
    },
    watch: {
      search (string) {
        store.commit('search', string)
      }
    },
    computed: {
      fullscreen () {
        return store.state.fullscreen
      },
      title () {
        return store.state.title
      },
      player () {
        return store.state.player
      },
      notification () {
        return store.state.notification
      }
    }
  }
</script>

<style lang="stylus">
  /* COMMON */
  body
    background url("img/background.jpg") no-repeat center center fixed
    background-size cover
    box-sizing border-box
    user-select none !important
    font-family 'Raleway', sans-serif !important
  html
  body
  .app
    height 100%
    overflow hidden
  .app
    display flex
    flex-flow column
  .main
    overflow auto
    height 100%
  .content
    margin 0 !important
    height 100%
    scroll-behavior smooth !important
  .md-chip
    margin 2px
    height 26px
    padding 6px 10px
    border-radius 26px
    line-height 13px
  .md-toolbar
    .md-button
      margin 0 !important
  .md-sidenav
    .md-toolbar
      .md-avatar
        width 100%
        margin-bottom 10px
      .md-title
        display inline-block
    .md-sidenav-content
      height 100%
      overflow hidden
      display flex
      flex-direction column
      .md-list
        height 100%
        overflow auto
        .md-list-item:not(.md-avatar-list)
          .router-link-active
            background-color rgba(153, 153, 153, 0.2)
  .flex
    display flex
    flex 1
  .no-padding
    padding 0 !important
    margin 0 !important
  .padding
    padding 4px !important
  .center
    align-items center !important
    text-align center !important
    justify-content center !important
  .hidden
    visibility hidden !important
  .removed
    display none !important
  .right
    align-items center !important
    float right !important
    text-align right !important
    justify-content right !important
  .left
    align-items center !important
    float left !important
    text-align left !important
    justify-content left !important
  .md-table
    .md-table-cell
      .md-button
        .md-icon
          width 24px
          min-width 24px
          height 24px
          min-height 24px
          font-size 24px
          margin auto
    .md-numeric
      .md-table-cell-container
          justify-content flex-end !important

  .md-tabs
    .md-tab-header
      text-transform none
    .md-tabs-content
      overflow hidden
      .md-tabs-wrapper
        overflow hidden
    .md-tabs-content.full
      height 100vh
      overflow-y auto
  .scrollable
    overflow-y auto
    height 100%

  /* chrome autofill */
  .md-input-container .md-icon:after
    background inherit !important

  /* search */
  .search
    flex-grow 2

  /* tooltips */
  .md-tooltip
    width 100px
    white-space normal
    text-align center
    height auto
    line-height 13px
    padding 5px

  /* borders */
  /*
  .md-card
    border 1px solid black
    .md-card-content
    .md-card-actions
    .md-card-media
      border-top 1px solid black
    .md-card-media.system
      .planet
        img
          border-right 1px solid black
      .orbit
        img
          border-bottom 1px solid black
  */

  /* chips */
  .md-chip
    .md-icon
      width 16px
      height 16px
      min-width 16px
      min-height 16px
      font-size 16px
    .md-icon + span
      margin-left 2px
  
  /* OPACITY */
  opacity = 0.90
  #toolbar
  .md-card
  .md-table-card
    opacity opacity
  .md-table-card.md-card
  .md-menu-content > .md-list
    background-color rgba(255,255,255,opacity) !important
  .md-progress
  .md-card-media
  .background
    background-color rgba(255,255,255,1 - opacity) !important
  .md-dialog
  .md-list
    background-color inherit !important

  .md-dialog
    max-width 90%
    max-height 90%
    .md-card
      margin 0 !important
      .md-card-header
        .md-title
          margin 0 !important
          display flex
          justify-content flex-start
          align-items center
          span + .md-chip
            margin-left 5px
      .md-card-media
        img
          height 140px
          padding 10px
      .md-card-content
        text-align center
      .md-card-header + .md-card-content
        padding-top 16px

  /* CARDS */
  border = 8px
  .rounded-top
    border-top-left-radius border
    border-top-right-radius border
    border-bottom-left-radius 0
    border-bottom-right-radius 0
  .rounded-top
    .md-tabs-navigation
      border-top-left-radius border
      border-top-right-radius border
      border-bottom-left-radius 0
      border-bottom-right-radius 0
  .rounded-bottom
    border-top-left-radius 0 !important
    border-top-right-radius 0 !important
    border-bottom-left-radius border
    border-bottom-right-radius border
  .md-layout
    // align-items flex-start
    // align-content flex-start
  .md-card
  .md-table-card
    border-radius border
  .md-card.card
    width 100%
    margin 4px
    .md-card-header
      .md-title
        margin 0 !important
        display flex
        justify-content center
        align-items center
        span + .md-chip
          margin-left 5px
    .md-card-content
      text-align center
      color white
      .md-progress
        margin 0
      .subprogress:first-of-type
        margin-top 10px
      .subprogress span
        margin 0 15px
        font-size 0.7em
        line-height 15px
    .md-card-media
      background url("img/back.jpg") no-repeat center center
      background-size cover
      img
        height 140px
        padding 10px
    .md-card-actions
      justify-content space-around
      padding 16px

  // buttons
  .md-button.md-dense
    font-size 10px
  .md-button[disabled]
    color grey

  // snackbar
  .md-snackbar
    .md-button
      margin 0 0 0 5px !important

  /* BLIZZARD */
  blizzard-dark = #151e25
  blizzard-light = #1d2730
  blizzard-font = #ccd2da
  blizzard-sub = #9EA0A3
  blizzard-accent = #2196F3
  .md-button.md-warn
  .md-button.md-accent
    border 1px solid
  .md-button.md-raised
    color blizzard-font !important
  .md-button.skill
  .md-card-media
    border 1px solid blizzard-accent
    box-sizing border-box
  .md-toolbar
  .md-snackbar-container
  .md-card
  .md-card-header
  .md-card-actions
  .md-card-content.accent
  .md-tabs-navigation
  .md-tooltip
    background-color blizzard-dark !important
  .md-table
  .md-card.md-table-card
  .md-card-content
  .md-card-media
    background-color blizzard-light !important
  .md-table-row
    border-top 1px solid blizzard-dark !important
  .md-table-cell
    color blizzard-font !important
    .md-table-cell-container
      padding 5px !important
  .md-table-row:hover
    .md-table-cell
      color blizzard-light !important
  .md-table
    color blizzard-font !important
    .md-table-head
    .md-table-head i
    .md-chip
      color blizzard-font !important
  .md-sidenav
    .md-toolbar
      background-color blizzard-dark !important
    .md-sidenav-content
      background-color blizzard-light !important
      .md-list
        color blizzard-font !important
        .md-icon
        .router-link-active
          color blizzard-font !important
        .md-subheader
          background-color blizzard-dark !important
          color blizzard-accent !important
          font-weight 700
          -moz-box-shadow inset  0  10px 10px -10px rgba(0,0,0,0.5), inset  0 -10px 10px -10px rgba(0,0,0,0.5)
          -webkit-box-shadow  inset  0  10px 10px -10px rgba(0,0,0,0.5), inset  0 -10px 10px -10px rgba(0,0,0,0.5)
          box-shadow  inset  0  10px 10px -10px rgba(0,0,0,0.5), inset  0 -10px 10px -10px rgba(0,0,0,0.5)
        .md-subheader:first-of-type
          margin-top 5px
        .md-icon
          color blizzard-accent !important
        .md-chip
        span
          font-size 0.85em
        .md-list-text-container > :nth-child(2)
          color blizzard-sub !important
  /* BLIZZARD */

  /* COLORS */
  grey = #F5F5F5
  green = #64DD17
  purple = #AA00FF
  indigo = #304FFE
  yellow = #FFEA00
  cyan = #00E5FF
  red = #D50000
  orange = #FF9800
  pink = #E91E63
  .grey
    .md-card-header
      color grey !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color grey !important
      color black !important
  .green
    .md-card-header
      color green !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color green !important
      color black !important
  .purple
    .md-card-header
      color purple !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color purple !important
      color white !important
  .indigo
    .md-card-header
      color indigo !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color indigo !important
      color white !important
  .yellow
    .md-card-header
      color yellow !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color yellow !important
      color black !important
  .cyan
    .md-card-header
      color cyan !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color cyan !important
      color black !important
  .red
    .md-card-header
      color red !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color red !important
      color white !important
  .orange
    .md-card-header
      color orange !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color orange !important
      color black !important
  .pink
    .md-card-header
      color pink !important
    .md-progress-track
    &.md-progress .md-progress-track
    .md-chip
    &.md-chip
      background-color pink !important
      color white !important

  .flip
    transform translate(-50%,-50%) rotate(180deg) !important

  /* ANIMATION TRANSITION */
  /*base code*/
  .animation
    -webkit-animation-duration 1s
    animation-duration 1s
    -webkit-animation-fill-mode both
    animation-fill-mode both
  .animation.infinite
    -webkit-animation-iteration-count infinite
    animation-iteration-count infinite
  .animation.slower
    -webkit-animation-duration 1.5s
    animation-duration 1.5s
  .animation.faster
    -webkit-animation-duration 0.5s
    animation-duration 0.5s
  /*the animation definition*/
  @keyframes fadeIn
    0%
      opacity 0
    100%
      opacity 1
  .fadeIn
    -webkit-animation-name fadeIn
    animation-name fadeIn
    
  /* MEDIA QUERIES */
  // sidebars appearing on desktop
  @media only screen and (min-width 1080px)
    .app
      padding-left 304px
      padding-right 304px
      .toggler
        display none
      .md-sidenav-content
        opacity 0.90
        top 0
        pointer-events auto
        transform translate3d(0, 0, 0) !important
        
  @media only screen and (max-width 768px)
    #toolbar
      .md-title
        font-size 16px
      .md-title + .md-input-container
        margin-left 10px
    .hide
      display none !important
</style>
