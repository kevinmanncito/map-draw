import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import sinon from 'sinon'

import Header from '../components/Header'
import AutoCompleteAddressField from '../components/AutoCompleteAddressField'
import InteractiveMap from '../components/InteractiveMap'

configure({ adapter: new Adapter() })

describe('Components render correctly', () => {
  it('Header renders correctly', () => {
    const wrapper = shallow(
      <Header title={'Test Title'} coordsFound={jest.fn()} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('AutoCompleteAddressField renders correctly', () => {
    class AutocompleteStub {
      addListener () {
        return null
      }
    }
    let googleStub = sinon.stub()
    googleStub.maps = {
      places: {
        Autocomplete: AutocompleteStub,
      },
    }
    global.google = googleStub

    const wrapper = shallow(
      <AutoCompleteAddressField coordsFound={jest.fn()} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('InteractiveMap renders correctly', () => {
    class mapStub {
      addControl () {
        return null
      }
      on () {
        return null
      }
    }
    global.mapboxgl = {
      Map: mapStub,
    }
    global.MapboxDraw = sinon.stub()
    const wrapper = shallow(
      <InteractiveMap
        areaCalculated={jest.fn()}
        coords={{lat: -95.587, lon: 41.313}} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
