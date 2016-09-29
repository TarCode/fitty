import React from 'react';
import JoinEvent from './joinEvent';
export default class EventList extends React.Component {
  constructor ( props ) {
    super( props );
  }

  render() {
    var events = this.props.events.map( function( item, index ) {
        return(
          <div key={ index }>
            <div className='col s3'>
                <img className='responsive-img' src={ item.eventImg }/>
                <br />
                <small>{ item.going + ' going'}</small>
            </div>
            <div className='col s6'>
                <h2>{ item.eventName }</h2>
                <blockquote>{ item.venue }</blockquote>
                <blockquote>{ item.cost}</blockquote>
            </div>
            <div className='col s3'>
                <JoinEvent index={ index } eventId={ item.eventId }></JoinEvent>
            </div>
          </div>
        )
    }.bind(this));

    return(
      <div className='row'>
          { events }
      </div>
    )
  }
}
