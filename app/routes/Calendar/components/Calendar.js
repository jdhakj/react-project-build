import React from 'react'

class Calendar extends React.Component {
  render() {
    const events = [
      { id: 0, title: '标题' }
    ]

    return (
      <div>
        <h2>Calendar</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

module.exports = Calendar
