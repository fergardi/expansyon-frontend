<template lang="pug">
  md-layout
  
    md-dialog(ref='info')
      md-card.md-primary.card(v-bind:class="item(selected).class")
        md-card-header
          .md-title
            span(v-if="selected.Planet") {{ selected.Planet.name }}
            span(v-else) {{ item(selected).name | i18n }}
            md-chip(v-if="selected.quantity > 0") {{ selected.quantity | format }}
            md-chip(v-if="selected.Planet") {{ selected.Planet.total | format }}
        md-card-media.ship(v-if="selected.Ship")
          img(v-bind:src="item(selected).image")
        md-card-media.relic(v-if="selected.Relic")
          img(v-bind:src="item(selected).image")
        md-card-media.system.planet(v-if="selected.Planet")
          .core
            img(v-bind:src="item(selected).image")
          .orbit(v-if="item(selected).moon || item(selected).station")
            img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="item(selected).moon")
            img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="item(selected).station")
        md-card-content
          span {{ item(selected).description | i18n }}
        md-card-content
          md-chip(v-if="selected.metal > 0") {{ selected.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip(v-if="selected.crystal > 0") {{ selected.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip(v-if="selected.oil > 0") {{ selected.oil | format }} {{ 'resource.oil' | i18n }}
          md-chip.pink(v-if="selected.aether > 0") {{ selected.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.close' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="confirm()", v-if="mine") {{ 'button.regret' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="confirm()", v-if="!mine", v-bind:disabled="!can") {{ 'button.buy' | i18n }}

    md-dialog(ref='confirm')
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'dialog.confirm.title' | i18n }}
        md-card-content
          span {{ 'dialog.confirm.description' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="regret()", v-if="mine") {{ 'button.confirm' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="buy()", v-if="!mine") {{ 'button.confirm' | i18n }}

    md-layout(v-for="sale in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="item(sale).class", md-with-hover, v-on:click.native="select(sale)")
        md-card-header.center
          .md-title
            span(v-if="sale.Planet") {{ sale.Planet.name }}
            span(v-else) {{ item(sale).name | i18n }}
            md-chip(v-if="sale.quantity > 0") {{ sale.quantity | format }}
            md-chip(v-if="sale.Planet") {{ sale.Planet.total | format }}
          .md-title
            md-chip(v-bind:class="color(sale.Player)") {{ sale.Player.name }}
        md-card-media.relic(v-if="sale.Relic")
          img(v-bind:src="item(sale).image")
        md-card-media.ship(v-if="sale.Ship")
          img(v-bind:src="item(sale).image")
        md-card-media.system.planet(v-if="sale.Planet")
          .core
            img(v-bind:src="item(sale).image")
          .orbit(v-if="item(sale).moon || item(sale).station")
            img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="item(sale).moon")
            img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="item(sale).station")
        md-card-content(v-if="sale.Planet && (item(sale).moon || item(sale).station || item(sale).main)")
          md-chip(v-if="item(sale).main") {{ 'resource.main' | i18n }}
          md-chip(v-if="item(sale).moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="item(sale).station") {{ 'resource.station' | i18n }}
        md-card-content.no-padding(v-if="sale.Planet")
          .subprogress(v-if="item(sale).metal")
            span.left {{ 'resource.metal' | i18n }}
            span.right {{ item(sale).metal }} %
          md-progress(v-bind:md-progress="item(sale).metal", v-if="item(sale).metal")
          .subprogress(v-if="item(sale).crystal")
            span.left {{ 'resource.crystal' | i18n }}
            span.right {{ item(sale).crystal }} %
          md-progress(v-bind:md-progress="item(sale).crystal", v-if="item(sale).crystal")
          .subprogress(v-if="item(sale).oil")
            span.left {{ 'resource.oil' | i18n }}
            span.right {{ item(sale).oil }} %
          md-progress(v-bind:md-progress="item(sale).oil", v-if="item(sale).oil")
          .subprogress(v-if="item(sale).size")
            span.left {{ 'resource.size' | i18n }}
            span.right {{ item(sale).size }} %
          md-progress(v-bind:md-progress="item(sale).size", v-if="item(sale).size")
          .subprogress(v-if="item(sale).energy")
            span.left {{ 'resource.energy' | i18n }}
            span.right {{ item(sale).energy }} %
          md-progress(v-bind:md-progress="item(sale).energy", v-if="item(sale).energy")
          .subprogress(v-if="item(sale).influence")
            span.left {{ 'resource.influence' | i18n }}
            span.right {{ item(sale).influence }} %
          md-progress(v-bind:md-progress="item(sale).influence", v-if="item(sale).influence")
        md-card-content.no-padding(v-if="sale.Ship")
          .subprogress(v-if="item(sale).attack")
            span.left {{ 'resource.attack' | i18n }}
            span.right {{ item(sale).attack }} %
          md-progress(v-bind:md-progress="item(sale).attack", v-if="item(sale).attack")
          .subprogress(v-if="item(sale).defense")
            span.left {{ 'resource.defense' | i18n }}
            span.right {{ item(sale).defense }} %
          md-progress(v-bind:md-progress="item(sale).defense", v-if="item(sale).defense")
          .subprogress(v-if="item(sale).speed")
            span.left {{ 'resource.speed' | i18n }}
            span.right {{ item(sale).speed }} %
          md-progress(v-bind:md-progress="item(sale).speed", v-if="item(sale).speed")
          .subprogress(v-if="item(sale).aim")
            span.left {{ 'resource.aim' | i18n }}
            span.right {{ item(sale).aim }} %
          md-progress(v-bind:md-progress="item(sale).aim", v-if="item(sale).aim")
          .subprogress(v-if="item(sale).evasion")
            span.left {{ 'resource.evasion' | i18n }}
            span.right {{ item(sale).evasion }} %
          md-progress(v-bind:md-progress="item(sale).evasion", v-if="item(sale).evasion")
          .subprogress(v-if="item(sale).cargo")
            span.left {{ 'resource.cargo' | i18n }}
            span.right {{ item(sale).cargo }} %
          md-progress(v-bind:md-progress="item(sale).cargo", v-if="item(sale).cargo")
        md-card-content(v-if="sale.Relic")
          md-chip(v-if="item(sale).level > 0") {{ item(sale).level | format }} {{ 'resource.level' | i18n }}
          md-chip(v-if="item(sale).experience > 0") {{ item(sale).experience | format }} {{ 'resource.experience' | i18n }}
          md-chip(v-if="item(sale).planet") {{ 'resource.planet' | i18n }}
          md-chip(v-if="item(sale).ship") {{ 'resource.ship' | i18n }}
          md-chip(v-if="item(sale).building") {{ 'resource.building' | i18n }}
          md-chip(v-if="item(sale).tower") {{ 'resource.tower' | i18n }}
          md-chip(v-if="item(sale).moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="item(sale).station") {{ 'resource.station' | i18n }}
          md-chip(v-if="item(sale).main") {{ 'resource.main' | i18n }}
          md-chip(v-if="item(sale).reset") {{ 'resource.reset' | i18n }}
          md-chip(v-if="item(sale).metal > 0") {{ item(sale).metal | format }} {{ 'resource.metal' | i18n }}
          md-chip(v-if="item(sale).crystal > 0") {{ item(sale).crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip(v-if="item(sale).oil > 0") {{ item(sale).oil | format }} {{ 'resource.oil' | i18n }}
        md-card-content(v-if="item(sale).description")
          span {{ item(sale).description | i18n }}
        md-card-content.accent
          md-chip(v-if="sale.metal > 0") {{ sale.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip(v-if="sale.crystal > 0") {{ sale.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip(v-if="sale.oil > 0") {{ sale.oil | format }} {{ 'resource.oil' | i18n }}
          md-chip.pink(v-if="sale.aether > 0") {{ sale.aether | format }} {{ 'resource.aether' | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
</template>

<script>
  import api from '../services/api'
  import notification from '../services/notification'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        sales: [],
        selected: {
          Player: {
            id: 0,
            name: ''
          }
        }
      }
    },
    created () {
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.market')
    },
    sockets: {
      market () {
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getSales()
        .then((sales) => {
          this.sales = sales
        })
      },
      info () {
        this.$refs['info'].open()
      },
      confirm () {
        this.$refs['info'].close()
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['info'].close()
        this.$refs['confirm'].close()
      },
      select (sale) {
        this.selected = sale
        this.info()
      },
      item (sale) {
        return sale.Planet || sale.Ship || sale.Relic || {}
      },
      buy () {
        api.buyMarket(store.state.player.id, this.selected.id)
        .then((result) => {
          notification.success('notification.market.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.market.error')
        })
        .then(() => {
          this.close()
        })
      },
      regret () {
        api.regretMarket(store.state.player.id, this.selected.id)
        .then((result) => {
          notification.success('notification.market.regret')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.market.error')
        })
        .then(() => {
          this.close()
        })
      },
      color (player) {
        return player.Faction
          ? player.Faction.class
          : ''
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.sales.filter((sale) => {
          return sale.Player.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || (sale.Relic
            ? this.$t(sale.Relic.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
            : sale.Planet
              ? sale.Planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
              : this.$t(sale.Ship.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
        })
      },
      can () {
        return this.selected.metal <= store.state.player.metal && this.selected.crystal <= store.state.player.crystal && this.selected.oil <= store.state.player.oil && this.selected.aether <= store.state.player.aether
      },
      mine () {
        return this.selected.Player.id === store.state.player.id
      }
    }
  }
</script>

<style lang="stylus" scoped>
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
