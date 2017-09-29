import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

class EventsResults extends React.PureComponent {
  render() {
    if (this.props.artist && this.props.events && this.props.events.length)
      return (
        <div className="events-results">
          <table>
            <tbody>
              <tr>
                <th>Artist</th>
                <th>Venue</th>
                <th>Date</th>
                <th></th>
              </tr>
              {this.props.events.map((event, i) => {
                return (
                  <tr key={`event-row-${i}`}>
                    <td>{event.lineup.reduce((lineup, name) => `${name}, ${lineup}`, '').slice(0, -2)}</td>
                    <td>{event.venue.name}, {event.venue.city}, {event.venue.country}</td>
                    <td>{moment(event.datetime).calendar()}</td>
                    <td>
                      <a href={event.url} target="_blank" title="See on Bandsintown">
                        <img src="./img/bandintown_icon.png" alt="Bandsintown" />
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    if (this.props.artist)
      return (
        <div className="events-results">
          <h3>There are no upcoming events for {this.props.artist}</h3>
        </div>
      )
    return (
      <div className="events-results">
        <h3>Input an artist name to view upcoming events</h3>
      </div>
    )
  }
}

export default EventsResults

EventsResults.propTypes = {
  artist: PropTypes.string,
  events: PropTypes.array
}