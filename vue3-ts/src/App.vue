<template>
  <div ref="containerRef" id="cesiumContainer"></div>
  <div ref="unvisibleCreditRef" v-show="false"></div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, onMounted } from 'vue'
import { ArcGisMapServerImageryProvider, Camera, Viewer, Rectangle } from 'cesium'

const containerRef = ref<HTMLDivElement>(null)
const unvisibleCreditRef = ref<HTMLDivElement>(null)
const viewer = shallowRef<Viewer>()

onMounted(() => {
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    75.0, // 东
    0.0, // 南
    140.0, // 西
    60.0 // 北
  )

  viewer.value = new Viewer(containerRef.value, {
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    scene3DOnly: true,
    baseLayerPicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    creditContainer: unvisibleCreditRef.value,
    imageryProvider: new ArcGisMapServerImageryProvider({
      url: `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`
    }),
    msaaSamples: 4,
    selectionIndicator: false,
    contextOptions: {
      requestWebgl2: true
    }
  })
})
</script>

<style>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
