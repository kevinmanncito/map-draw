import React from 'react'

import Header from './components/Header'
import InteractiveMap from './components/InteractiveMap'

class App extends React.Component {
  STEP_ONE_LABEL = 'Step 1: Find your house'
  STEP_TWO_LABEL = 'Step 2: Draw a point on the corners of your roof'

  // {lat: -34.397, lng: 150.644}
  state = {
    area: undefined,
    coords: {
      lat: -34.387,
      lon: 150.644,
    },
    currentStep: this.STEP_ONE_LABEL,
  }

  areaCalculated (area) {
    const areaInFeet = area * 3.28084
    const roundedArea = Math.round(areaInFeet * 100) / 100
    if (!roundedArea) {
      this.setState({
        area: roundedArea,
        currentStep: this.STEP_TWO_LABEL,
      })
      return
    }
    this.setState({
      area: roundedArea,
      currentStep: `Area: ${roundedArea} square feet`,
    })
  }

  coordsFound (newCoords) {
    this.setState({
      coords: newCoords,
      currentStep: this.STEP_TWO_LABEL,
    })
  }

  render () {
    return (
      <div className='column'>
        <Header
          coordsFound={(coords) => this.coordsFound(coords)}
          title={this.state.currentStep} />
        <InteractiveMap
          areaCalculated={(area) => this.areaCalculated(area)}
          coords={this.state.coords} />
      </div>
    )
  }
}

export default App
