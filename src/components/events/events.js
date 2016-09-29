import React from 'react';
import { Link } from 'react-router';
import store from '../../stores/store';
import viewActions from '../../actions/viewActions';
import EventList from './eventList';

export default class Events extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = store.getStoreData();
  }

  render() {

    return(
      <div>
          <div className='container center'>
              <input type='text' className='input'/>
              <button className='btn btn-small black'>Search</button>
          </div>
          <hr />
          <div className='container'>
            <EventList events={ this.state.events }></EventList>
          </div>
      </div>
    )
  }
}
