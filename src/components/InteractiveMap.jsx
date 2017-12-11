import React from 'react'
import PropTypes from 'prop-types'

class InteractiveMap extends React.Component {
  static propTypes = {
    areaCalculated: PropTypes.func.isRequired,
    coords: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
  }
  map = undefined
  drawingManager = undefined

  componentWillReceiveProps (props) {
    this.map.setCenter({lat: props.coords.lat, lng: props.coords.lon})
    this.map.setZoom(26)
    this.map.setTilt(0)
  }

  componentDidMount () {
    this.updateArea = this.updateArea.bind(this)

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.props.coords.lat, lng: this.props.coords.lon},
      zoom: 5,
      mapTypeId: 'satellite',
    })

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon', 'polyline'],
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
    })
    this.drawingManager.setMap(this.map)
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', this.updateArea)
  }

  updateArea (e) {
    const overlay = e.overlay
    if (overlay.getPath) {
      const area = google.maps.geometry.spherical.computeArea(overlay.getPath())
      this.props.areaCalculated(area)
    }
  }

  render () {
    return (
      <div id='map' className='content' />
    )
  }
}

export default InteractiveMap
