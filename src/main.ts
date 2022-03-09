import {
  Viewer,
  Camera,
  Rectangle,
  ArcGisMapServerImageryProvider
} from 'cesium'

import './main.css'

type DemoDebugging = {
  viewer: Viewer | null
}

const container = document.getElementById('cesium-container')
const DEMO: DemoDebugging = {
  viewer: null
}

const entry = () => {
  const credits = document.createElement('div')
  credits.style.display = 'none'
  DEMO.viewer = new Viewer(container as Element, {
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    scene3DOnly: true,
    baseLayerPicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    creditContainer: credits,
    imageryProvider: new ArcGisMapServerImageryProvider({
      url: `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`
    }),
    msaaSamples: 4,
    selectionIndicator: false,
    contextOptions: {
      requestWebgl2: true
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  // 默认定位到中国上空
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    75.0, // 东
    0.0, // 南
    140.0, // 西
    60.0 // 北
  )
  Object.defineProperty(window, 'CESIUM_BASE_URL', {
    value: import.meta.env.VITE_CESIUM_BASE_URL
  })
  Object.defineProperty(window, 'DEMO', {
    value: DEMO
  })
  entry()
})
