import React from 'react'
import PropTypes from 'prop-types'

class AutoCompleteAddressField extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    coordsFound: PropTypes.func.isRequired,
  }

  autocomplete = undefined;

  componentDidMount () {
    this.addressFound = this.addressFound.bind(this)

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
      {types: ['geocode']}
    )

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    this.autocomplete.addListener('place_changed', this.addressFound)
  }

  addressFound (address) {
    const place = this.autocomplete.getPlace()
    if (place.geometry) {
      const lat = place.geometry.location.lat()
      const lon = place.geometry.location.lng()
      this.props.coordsFound({
        lat: lat,
        lon: lon,
      })
    }
  }

  render () {
    return (
      <div>
        <input
          id='autocomplete'
          type='text'
          className='autocomplete-field'
          placeholder={this.props.placeholder} />
      </div>
    )
  }
}

export default AutoCompleteAddressField
