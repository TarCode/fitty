import React from 'react';
import { Link } from 'react-router';
import store from '../../stores/store';
import UserInput from './userInput';

export default class Login extends React.Component {
  constructor(props) {
    super( props );
    this._onChange = this._onChange.bind(this);
    this.state = {username: store.getUser()};
    console.log('loginstate',this.state);
  }

  componentDidMount() {
    store.addChangeListener(this._onChange);

  }

  componentWillUnmount() {
    store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({username: store.getUser()});
    console.log('component state', this.state);
  }

  render() {

    return(
      <div className="container">
        <div className='center'>
          <h2 className='title'>Welcome to Fitty</h2>
          <br/>
          <UserInput username={ this.state.username }/>
          <br/>
          <Link to={'/home'} ><button className='btn black darken-4'>Login</button></Link>
        </div>
      </div>
    )
  }
}
