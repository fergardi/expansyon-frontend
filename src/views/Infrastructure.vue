<template lang="pug">
  md-layout

    md-dialog(ref='form')
      md-card.md-primary.card(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="build()")
          md-card-header
            .md-title
              span {{ selected.name | i18n }}
              md-chip {{ selected.PlayerBuilding.quantity | format }}
          md-card-media.building
            img(v-bind:src="selected.image")
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !can }")
              md-icon add
              label {{ 'resource.quantity' | i18n }} ({{ (maximum - quantity) | format }})
              md-input(type="number", v-model.number="quantity", min="0", v-bind:max="maximum", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
          md-card-content
            md-chip {{ (selected.metal * quantity) | format }} {{ 'resource.metal' | i18n }}
            md-chip {{ (selected.crystal * quantity) | format }} {{ 'resource.crystal' | i18n }}
            md-chip {{ (selected.oil * quantity) | format }} {{ 'resource.oil' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") {{ 'button.build' | i18n }}

    md-layout(v-for="building in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="building.class", md-with-hover, v-on:click.native="select(building)")
        md-card-header
          .md-title
            span {{ building.name | i18n }}
            md-chip {{ building.PlayerBuilding.quantity | format }}
        md-card-media.building
          img(v-bind:src="building.image")
        md-card-content.no-padding
          .subprogress
            span.left {{ 'resource.energy' | i18n }}
            span.right {{ building.energy }} %
          md-progress(v-bind:md-progress="building.energy")
          .subprogress
            span.left {{ 'resource.shield' | i18n }}
            span.right {{ building.shield }} %
          md-progress(v-bind:md-progress="building.shield")
          .subprogress
            span.left {{ 'resource.storage' | i18n }}
            span.right {{ building.storage }} %
          md-progress(v-bind:md-progress="building.storage")
        md-card-content
          span {{ building.description | i18n }}
        md-card-content.accent
          md-chip {{ building.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip {{ building.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip {{ building.oil | format }} {{ 'resource.oil' | i18n }}

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
        selected: {
          metal: 1,
          crystal: 1,
          oil: 1,
          PlayerBuilding: {
            quantity: 0
          }
        },
        quantity: 0
      }
    },
    mounted () {
      store.commit('title', 'title.infrastructure')
    },
    methods: {
      form () {
        this.$refs['form'].open()
      },
      close () {
        this.$refs['form'].close()
      },
      clear () {
        this.quantity = 0
      },
      select (building) {
        this.selected = building
        this.form()
      },
      build () {
        api.buildBuilding(store.state.player.id, this.selected.id, this.quantity)
        .then((result) => {
          notification.success('notification.infrastructure.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.infrastructure.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
      }
    },
    computed: {
      player () {
        return store.state.player
      },
      buildings () {
        return this.player.Buildings
      },
      maximum () {
        return Math.min(Math.floor(this.player.metal / this.selected.metal), Math.floor(this.player.crystal / this.selected.crystal), Math.floor(this.player.oil / this.selected.oil))
      },
      can () {
        return this.selected.metal * this.quantity <= this.player.metal && this.selected.crystal * this.quantity <= this.player.crystal && this.selected.oil * this.quantity <= this.player.oil && this.quantity > 0 && this.quantity <= this.maximum && (this.selected.PlayerBuilding.quantity + this.quantity <= this.player.size)
      },
      search () {
        return store.state.search
      },
      filtered () {
        return this.buildings.filter((building) => {
          return this.$t(building.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
