import React from 'react';
import viewActions from '../../actions/viewActions';
import store from '../../stores/store'
export default class UserInput extends React.Component {
  constructor(props) {
    super(props);
  }

  changeUser() {
    viewActions.loginUser();
  }

  render() {

    return(
      <div>
        <input id='username' className="form-control" value={ this.props.username } name='username' onChange={ this.changeUser} type='text'/>
        <br/>
        <input className="form-control" placeholder='password' name='password' type='password'/>
      </div>
    )
  }

}
