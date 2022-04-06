import React, { useRef, useEffect } from 'react'
import { ArcGisMapServerImageryProvider, Camera, Rectangle, Viewer } from 'cesium'
import './App.css'

function App() {
  const cesiumViewerRef = useRef<Viewer>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
      75.0, // 东
      0.0, // 南
      140.0, // 西
      60.0 // 北
    )
    
    const credits = document.createElement('div')
    credits.style.display = 'none'
    cesiumViewerRef.current = new Viewer(containerRef.current as Element, {
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
  }, [])

  return (
    <div id="cesiumContainer" ref={containerRef}></div>
  )
}

export default App
