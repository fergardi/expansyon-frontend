<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title
            span {{ selected.name }}
            md-chip {{ selected.total }} %
        md-card-media.referendum
          img(v-bind:src="selected.image")
        md-card-content
          md-chip.pink {{ selected.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="vote()", v-bind:disabled="!can(selected.aether)") {{ 'button.vote' | i18n }}
    
    md-layout(v-for="referendum in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="referendum.class", md-with-hover, v-on:click.native="select(referendum)")
        md-card-header
          .md-title
            span {{ referendum.name }}
            md-chip {{ referendum.total | format }} %
          .md-title
            md-chip.grey {{ referendum.votes | format }} {{ 'resource.votes' | i18n }}
        md-card-media.referendum
          img(v-bind:src="referendum.image")
        md-card-content.no-padding
          .subprogress
            span.left {{ 'resource.metal' | i18n }}
            span.right {{ referendum.metal }} %
          md-progress(v-bind:md-progress="abs(referendum.metal)", v-bind:class="referendum.metal >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.crystal' | i18n }}
            span.right {{ referendum.crystal }} %
          md-progress(v-bind:md-progress="abs(referendum.crystal)", v-bind:class="referendum.crystal >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.oil' | i18n }}
            span.right {{ referendum.oil }} %
          md-progress(v-bind:md-progress="abs(referendum.oil)", v-bind:class="referendum.oil >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.size' | i18n }}
            span.right {{ referendum.size }} %
          md-progress(v-bind:md-progress="abs(referendum.size)", v-bind:class="referendum.size >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.energy' | i18n }}
            span.right {{ referendum.energy }} %
          md-progress(v-bind:md-progress="abs(referendum.energy)", v-bind:class="referendum.energy >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.experience' | i18n }}
            span.right {{ referendum.experience }} %
          md-progress(v-bind:md-progress="abs(referendum.experience)", v-bind:class="referendum.experience >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.attack' | i18n }}
            span.right {{ referendum.attack }} %
          md-progress(v-bind:md-progress="abs(referendum.attack)", v-bind:class="referendum.attack >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.defense' | i18n }}
            span.right {{ referendum.defense }} %
          md-progress(v-bind:md-progress="abs(referendum.defense)", v-bind:class="referendum.defense >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.speed' | i18n }}
            span.right {{ referendum.speed }} %
          md-progress(v-bind:md-progress="abs(referendum.speed)", v-bind:class="referendum.speed >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.aim' | i18n }}
            span.right {{ referendum.aim }} %
          md-progress(v-bind:md-progress="abs(referendum.aim)", v-bind:class="referendum.aim >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.evasion' | i18n }}
            span.right {{ referendum.evasion }} %
          md-progress(v-bind:md-progress="abs(referendum.evasion)", v-bind:class="referendum.evasion >= 0 ? 'green' : 'red'")
          .subprogress
            span.left {{ 'resource.cargo' | i18n }}
            span.right {{ referendum.cargo }} %
          md-progress(v-bind:md-progress="abs(referendum.cargo)", v-bind:class="referendum.cargo >= 0 ? 'green' : 'red'")
        md-card-content.accent
          md-chip.pink {{ referendum.aether | format }} {{ 'resource.aether' | i18n }}

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
        referendums: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.senate')
    },
    sockets: {
      senate () {
        this.close()
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getReferendums()
        .then((referendums) => {
          this.referendums = referendums
        })
      },
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (referendum) {
        this.selected = referendum
        this.confirm()
      },
      vote () {
        api.voteReferendum(store.state.player.id, this.selected.id)
        .then((result) => {
          notification.success('notification.senate.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.senate.error')
        })
        .then(() => {
          this.close()
        })
      },
      can (aether) {
        return store.state.player.aether >= aether
      },
      abs (percent) {
        return Math.abs(percent)
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.referendums.filter((referendum) => {
          return referendum.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
