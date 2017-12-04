import React from 'react'
import PropTypes from 'prop-types'

import AutoCompleteAddressField from './AutoCompleteAddressField'

class Header extends React.Component {
  static propTypes = {
    coordsFound: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  render () {
    return (
      <header className='header'>
        <h1>{this.props.title}</h1>
        <AutoCompleteAddressField
          coordsFound={(coords) => this.props.coordsFound(coords)}
          placeholder='Enter address' />
      </header>
    )
  }
}

export default Header
