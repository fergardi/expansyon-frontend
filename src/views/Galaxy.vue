<template lang="pug">
  #map
</template>

<script>
  import L from 'leaflet'
  import 'leaflet.markercluster'
  // import notification from '../services/notification'
  import store from '../vuex/store'
  
  export default {
    data () {
      return {
        planets: [
          'https://image.flaticon.com/icons/svg/124/124558.svg',
          'https://image.flaticon.com/icons/svg/124/124582.svg',
          'https://image.flaticon.com/icons/svg/139/139706.svg',
          'https://image.flaticon.com/icons/svg/139/139706.svg',
          'https://image.flaticon.com/icons/svg/124/124581.svg',
          'https://image.flaticon.com/icons/svg/139/139727.svg',
          'https://image.flaticon.com/icons/svg/207/207532.svg',
          'https://image.flaticon.com/icons/svg/308/308748.svg',
          'https://image.flaticon.com/icons/svg/124/124555.svg',
          'https://image.flaticon.com/icons/svg/139/139682.svg',
          'https://image.flaticon.com/icons/svg/139/139725.svg',
          'https://image.flaticon.com/icons/svg/139/139730.svg',
          'https://image.flaticon.com/icons/svg/139/139728.svg',
          'https://image.flaticon.com/icons/svg/231/231105.svg',
          'https://image.flaticon.com/icons/svg/327/327483.svg',
          'https://image.flaticon.com/icons/svg/305/305895.svg',
          'https://image.flaticon.com/icons/svg/310/310121.svg',
          'https://image.flaticon.com/icons/svg/234/234298.svg',
          'https://image.flaticon.com/icons/svg/139/139693.svg',
          'https://image.flaticon.com/icons/svg/139/139707.svg',
          'https://image.flaticon.com/icons/svg/270/270146.svg',
          'https://image.flaticon.com/icons/svg/124/124559.svg'
        ],
        galaxies: [
          'https://image.flaticon.com/icons/svg/190/190279.svg',
          'https://image.flaticon.com/icons/svg/139/139686.svg',
          'https://image.flaticon.com/icons/svg/167/167347.svg',
          'https://image.flaticon.com/icons/svg/124/124567.svg'
        ]
      }
    },
    created () {
      store.commit('title', 'title.defense')
    },
    mounted () {
      var map = L.map('map', {
        zoomControl: false
      }).setView([0, 0], 2)
      var bounds = new L.LatLngBounds(new L.LatLng(90, -180), new L.LatLng(-90, 180))
      L.tileLayer('http://psousa.net/demos/zoom-images/eso/{z}/{x}/{y}.jpg', {
        center: bounds.getCenter(),
        minZoom: 2,
        maxZoom: 6,
        tms: true,
        maxBounds: bounds
      }).addTo(map)
      map.on('drag', () => {
        map.panInsideBounds(bounds, { animate: false })
      })
      var system = L.markerClusterGroup({
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
      }).addTo(map)
      for (var i = 0; i < 500; i++) {
        system.addLayer(L.marker([-90 + Math.floor(Math.random() * 180), -180 + Math.floor(Math.random() * 360)], {
          icon: L.icon({
            iconUrl: this.planets[Math.floor(Math.random() * this.planets.length)],
            iconSize: [25, 25],
            iconAnchor: [25, 25]
          })
        }))
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
</style>
