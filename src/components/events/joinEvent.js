import React from 'react';
import viewActions from '../../actions/viewActions';

export default class JoinEvent extends React.Component {
  constructor ( props ) {
    super( props );
    this.joinEvent = this.joinEvent.bind(this);
  }

  joinEvent() {
    var data = {
                  index: this.props.index,
                  eventId: this.props.eventId
                }


    viewActions.joinEvent(data);
  }

  render() {
    return(
      <button onClick={ this.joinEvent } id='goingBtn' className='btn btn-small black'>Going</button>
    )
  }
}
