import React from 'react'
import './App.scss'
import { debounce as _debounce } from 'lodash'

import SearchField from './SearchField'
import EventsResults from './EventsResults'

import { getArtistEvents } from '../bandsintown-api'

class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      window: {
        height: window.innerHeight,
        width: window.innerWidth
      },
      artist: null,
      events: null
    }
  }
  componentWillMount() {
    window.addEventListener('resize', _debounce(this.updateWindowDimensions.bind(this), 100))
  }
  // componentDidMount() {
  //   this.setState({ artist: 'maroon 5', events: require('../test-data.json') })
  // }
  getArtistEvents(artist) {
    getArtistEvents(artist)
      .then(events => {
        this.setState({ artist, events })
      })
      .catch(err => {
        console.error(err)
        this.setState({ artist, events })
      })
  }
  updateWindowDimensions() {
    this.setState({
      window: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    })
  }
  onSearch(query) {
    if (query && query !== '')
      this.getArtistEvents(query)
    else
      this.setState({ artist: null, events: null })
  }
  render() {
    return (
      <div className="app-wrapper" style={{ height: this.state.window.height }}>
        <Header>
          <SearchField
            onSearch={this.onSearch.bind(this)}
            debounceTimeMs={250}
          />
        </Header>
        <EventsResults
          artist={this.state.artist}
          events={this.state.events}
        />
      </div>
    )
  }
}

export default App

const Header = ({ children }) => {
  return (
    <header>
      <div className="header-info">
        <img src="./img/bandintown_icon.png" alt="Bandsintown" />
        <h1>Event Finder</h1>
      </div>
      {children}
    </header>
  )
}