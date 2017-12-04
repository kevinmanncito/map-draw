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
  draw = undefined

  componentWillReceiveProps (props) {
    this.map.setCenter([props.coords.lon, props.coords.lat])
    this.map.setZoom(18)
  }

  componentDidMount () {
    this.updateArea = this.updateArea.bind(this)

    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5ybWFubiIsImEiOiJBTWUyS05zIn0.ZPXjYLQs4QIJiqp85cfI0w'
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/kevinrmann/cjaj68e7dakuc2slmhkk3bav6', // hosted style id
      center: [this.props.coords.lat, this.props.coords.lon],
      zoom: 4, // starting zoom
    })

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    })
    this.map.addControl(this.draw)

    this.map.on('draw.create', this.updateArea)
    this.map.on('draw.delete', this.updateArea)
    this.map.on('draw.update', this.updateArea)
  }

  updateArea (e) {
    const data = this.draw.getAll()
    if (data.features.length > 0) {
      const area = turf.area(data)
      this.props.areaCalculated(area)
    } else {
      this.props.areaCalculated(undefined)
    }
  }

  render () {
    return (
      <div id='map' className='content' />
    )
  }
}

export default InteractiveMap
