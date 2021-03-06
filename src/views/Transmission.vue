<template lang="pug">
  md-table-card

    md-dialog(ref='report')
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'title.battle' | i18n }}
        md-card-content
          md-chip.grey(v-for="ship in reported.Ships") {{ ship.BattleShip.quantity | format }} {{ ship.name | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="confirm()") {{ 'button.retreat' | i18n }}

    md-dialog(ref='message')
      md-card.md-primary.card
        md-card-header
          .md-title {{ selected.subject }}
        md-card-content
          span {{ selected.text | lorem }}
        md-card-content
          md-chip(v-bind:class="color(selected)") {{ name(selected) }}
          md-chip.grey {{ selected.datetime | date }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="confirm()") {{ 'button.delete' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="reply()") {{ 'button.reply' | i18n }}

    md-dialog(ref='confirm')
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'dialog.confirm.title' | i18n }}
        md-card-content
          span {{ 'dialog.confirm.description' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="remove()") {{ 'button.accept' | i18n }}

    md-tabs(md-fixed)
      md-tab#battles.no-padding(v-bind:md-label="$t('tab.battle')")

        md-table(md-sort="end", md-sort-type="desc", v-on:sort="order")
          md-table-header
            md-table-row
              md-table-head(md-sort-by="Player.name") {{ 'table.from' | i18n }}
              md-table-head.md-numeric(md-sort-by="start") {{ 'table.start' | i18n }}
              md-table-head.md-numeric(md-sort-by="end") {{ 'table.end' | i18n }}

          md-table-body
            md-table-row(v-for="battle in battlesOrdered", md-auto-select, v-bind:md-item="battle", v-on:click.native="report(battle)")
              md-table-cell
                md-chip(v-bind:class="from(battle)") {{ battle.Player.name }}
              md-table-cell.md-numeric {{ battle.start | date }}
              md-table-cell.md-numeric {{ battle.end | date }}

            md-table-row(v-if="!battlesOrdered.length")
              md-table-cell(colspan="3") {{ 'filter.nothing' | i18n }}

      md-tab#received.no-padding(v-bind:md-label="$t('tab.received')")

        md-table(md-sort="datetime", md-sort-type="desc", v-on:sort="order")
          md-table-header
            md-table-row
              md-table-head(md-sort-by="From.name") {{ 'table.from' | i18n }}
              md-table-head(md-sort-by="subject") {{ 'table.subject' | i18n }}
              md-table-head.hide(md-sort-by="text") {{ 'table.text' | i18n }}
              md-table-head.md-numeric(md-sort-by="datetime") {{ 'table.datetime' | i18n }}

          md-table-body
            md-table-row(v-for="message in receivedOrdered", md-auto-select, v-bind:md-item="message", v-on:click.native="select(message)")
              md-table-cell
                md-chip(v-bind:class="color(message)") {{ message.From.name }}
              md-table-cell {{ message.subject }}
              md-table-cell.hide {{ message.text | lorem }}
              md-table-cell.md-numeric {{ message.datetime | date }}

            md-table-row(v-if="!receivedOrdered.length")
              md-table-cell(colspan="4") {{ 'filter.nothing' | i18n }}
    //
      md-tab#sent.no-padding(v-bind:md-label="$t('tab.sent')")

        md-table(md-sort="datetime", md-sort-type="desc", v-on:sort="order")
          md-table-header
            md-table-row
              md-table-head(md-sort-by="To.name") {{ 'table.to' | i18n }}
              md-table-head(md-sort-by="subject") {{ 'table.subject' | i18n }}
              md-table-head.hide(md-sort-by="text") {{ 'table.text' | i18n }}
              md-table-head.md-numeric(md-sort-by="datetime") {{ 'table.datetime' | i18n }}

          md-table-body
            md-table-row(v-for="message in sentOrdered", md-auto-select, v-bind:md-item="message", v-on:click.native="select(message)")
              md-table-cell
                md-chip(v-bind:class="color(message)") {{ message.To.name }}
              md-table-cell {{ message.subject }}
              md-table-cell.hide {{ message.text | lorem }}
              md-table-cell.md-numeric {{ message.datetime | date }}

            md-table-row(v-if="!sentOrdered.length")
              md-table-cell(colspan="4") {{ 'filter.nothing' | i18n }}

      md-tab#new(v-bind:md-label="$t('tab.create')")

        form(v-on:submit.stop.prevent="send()")
          md-input-container
            label {{ 'transmission.to' | i18n }}
            md-select(name="to", id="to", v-model="message.to", required)
              md-option(v-for="player in players", v-bind:value="player.id") {{ player.name }}
          md-input-container
            label {{ 'transmission.subject' | i18n }}
            md-input(type="text", v-model="message.subject", maxlength="70", required)
          md-input-container
            label {{ 'transmission.text' | i18n }}
            md-textarea(v-model="message.text", maxlength="140", required)
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="clear()") {{ 'button.clear' | i18n }}
            md-button.md-dense.md-accent(type="submit") {{ 'button.send' | i18n }}
</template>

<script>
  import api from '../services/api'
  import notification from '../services/notification'
  import store from '../vuex/store'
  import _ from 'lodash'

  export default {
    name: 'Transmission',
    data () {
      return {
        battles: [],
        players: [],
        field: 'date',
        direction: 'desc',
        selected: {
          From: {},
          To: {}
        },
        reported: {
          Ships: []
        },
        message: {
          to: null,
          subject: '',
          text: ''
        }
      }
    },
    created () {
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.transmission')
    },
    methods: {
      refresh () {
        api.getBattles()
        .then((battles) => {
          this.battles = battles
        })
        api.getPlayers()
        .then((players) => {
          this.players = players
          this.message.to = store.state.account.id
        })
      },
      select (message) {
        this.selected = message
        this.$refs['message'].open()
      },
      report (battle) {
        this.reported = battle
        this.$refs['report'].open()
      },
      confirm () {
        this.$refs['message'].close()
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['message'].close()
        this.$refs['confirm'].close()
        this.$refs['report'].close()
      },
      remove () {
        api.removeMessage(store.state.player.id, this.selected.id)
        .then((result) => {
          notification.success('notification.transmission.remove')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.transmission.error')
        })
        .then(() => {
          this.close()
        })
      },
      reply () {
        // TODO
        this.close()
      },
      send () {
        api.sendMessage(store.state.player.id, this.message)
        .then((result) => {
          notification.success('notification.message.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.message.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
      },
      clear () {
        this.message.to = store.state.account.id
        this.message.subject = ''
        this.message.text = ''
      },
      retreat () {
        // TODO
        this.close()
      },
      order (column) {
        this.field = column.name
        this.direction = column.type
      },
      color (message) {
        return message.From
          ? message.From.Faction
            ? message.From.Faction.class
            : ''
          : message.To.Faction
            ? message.To.Faction.class
            : ''
      },
      from (battle) {
        return battle.Player.Faction
          ? battle.Player.Faction.class
          : ''
      },
      name (message) {
        return message.From
          ? message.From.name
          : message.To.name
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      battlesFiltered () {
        return this.battles.filter((battle) => {
          return battle.Player.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      battlesOrdered () {
        return _.orderBy(this.battlesFiltered, this.field, this.direction)
      },
      receivedFiltered () {
        return this.received.filter((message) => {
          return message.From.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || message.subject.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      receivedOrdered () {
        return _.orderBy(this.receivedFiltered, this.field, this.direction)
      },
      sentFiltered () {
        return this.sent.filter((message) => {
          return message.To.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || message.subject.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      sentOrdered () {
        return _.orderBy(this.sentFiltered, this.field, this.direction)
      },
      received () {
        return store.state.player.Received
      },
      sent () {
        return store.state.player.Sent
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-dialog
    .md-title
      word-wrap break-word
</style>
