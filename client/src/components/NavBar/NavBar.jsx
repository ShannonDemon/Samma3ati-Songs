import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar(props) {
  console.log('nav props', props)
  return (
    <>
    {props.isAuth ? (
        <div>
          <ul className="navbar-ul">
          <li><Link to='/signin' className='text-info'>Dashboard</Link></li>
          <li><Link to = '/favorite' className='text-info'>Favorites</Link></li>
          <li><Link to='/profile' className='text-info'>Profile</Link></li>
          <li><Link to="/logout" className='text-info' onClick={props.onLogoutHandler}>Logout</Link></li>
          {props.user ? "Welcome " + props.user.user.name : null}
          </ul>
        </div>
     ) : (
      <div>
      <ul className="navbar-ul">
      {/* <li><Link to='/home'>Home</Link></li> */}
      <li><Link to="/signup" className='text-info'>Signup</Link></li>
      <li><Link to="/signin" className='text-info'>Signin</Link></li>
      </ul>
    </div>
     )}

    </>
  )
}

export default NavBar