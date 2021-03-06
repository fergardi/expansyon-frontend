<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name | i18n }}
        md-card-media.faction
          img(v-bind:src="selected.image")
        md-card-content
          span {{ selected.description | i18n }}
        md-card-content
          md-chip.pink {{ selected.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="join()", v-bind:disabled="!can(selected.aether)") {{ 'button.join' | i18n }}

    md-layout(v-for="faction in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="faction.class", md-with-hover, v-on:click.native="select(faction)")
        md-card-header
          .md-title {{ faction.name | i18n }}
        md-card-media.faction
          img(v-bind:src="faction.image")
        md-card-content.no-padding
          .subprogress
            span.left {{ 'resource.metal' | i18n }}
            span.right {{ faction.metal }} %        
          md-progress(v-bind:md-progress="faction.metal")
          .subprogress
            span.left {{ 'resource.crystal' | i18n }}
            span.right {{ faction.crystal }} %          
          md-progress(v-bind:md-progress="faction.crystal")
          .subprogress
            span.left {{ 'resource.oil' | i18n }}
            span.right {{ faction.oil }} %          
          md-progress(v-bind:md-progress="faction.oil")
          .subprogress
            span.left {{ 'resource.size' | i18n }}
            span.right {{ faction.size }} %          
          md-progress(v-bind:md-progress="faction.size")
          .subprogress
            span.left {{ 'resource.energy' | i18n }}
            span.right {{ faction.energy }} %          
          md-progress(v-bind:md-progress="faction.energy")
          .subprogress
            span.left {{ 'resource.experience' | i18n }}
            span.right {{ faction.experience }} %          
          md-progress(v-bind:md-progress="faction.experience")
          .subprogress
            span.left {{ 'resource.attack' | i18n }}
            span.right {{ faction.attack }} %          
          md-progress(v-bind:md-progress="faction.attack")
          .subprogress
            span.left {{ 'resource.defense' | i18n }}
            span.right {{ faction.defense }} %          
          md-progress(v-bind:md-progress="faction.defense")
          .subprogress
            span.left {{ 'resource.speed' | i18n }}
            span.right {{ faction.speed }} %          
          md-progress(v-bind:md-progress="faction.speed")
          .subprogress
            span.left {{ 'resource.aim' | i18n }}
            span.right {{ faction.aim }} %          
          md-progress(v-bind:md-progress="faction.aim")
          .subprogress
            span.left {{ 'resource.evasion' | i18n }}
            span.right {{ faction.evasion }} %          
          md-progress(v-bind:md-progress="faction.evasion")
          .subprogress
            span.left {{ 'resource.cargo' | i18n }}
            span.right {{ faction.cargo }} %          
          md-progress(v-bind:md-progress="faction.cargo")
        md-card-content
          span {{ faction.description | i18n }}
        md-card-content.accent
          md-chip.pink {{ faction.aether | format }} {{ 'resource.aether' | i18n }}

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
        factions: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      api.getFactions()
      .then((factions) => {
        this.factions = factions
      })
    },
    mounted () {
      store.commit('title', 'title.temple')
    },
    methods: {
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (faction) {
        this.selected = faction
        this.confirm()
      },
      join () {
        api.joinFaction(store.state.player.id, this.selected.id)
        .then((player) => {
          notification.success('notification.temple.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.temple.error')
        })
        .then(() => {
          this.close()
        })
      },
      can (aether) {
        return store.state.player.aether >= aether
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.factions.filter((faction) => {
          return this.$t(faction.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
