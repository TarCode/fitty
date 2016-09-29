import React from 'react';
import { Link } from 'react-router';

export default ( props ) => {
  var logoStyle = {
    height: '40px',
    width: 'auto',
    paddingTop: '10px',
    paddingLeft: '10px'
  }
	return (
		<div>
    <nav>
      <div className="nav-wrapper black darken-4">
        <Link to='/home' className="left brand-logo"><img style={ logoStyle } className='responsive-img' src='fittyWhite.png'/></Link>
        <ul id="nav-mobile" className="right">
          <li><Link to="/home">Home</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </div>
    </nav>

      { props.children }
    <nav className="nav-wrapper center black darken-4">
      <p>Tarcode 2016</p>
    </nav>
		</div>
	)
}
