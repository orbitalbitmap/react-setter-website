import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import AdminLink from './partials/AdminLink'
import NavLogout from './partials/NavLogout'

const renderLinks = (gymList = [], url) => {
  return gymList.map(gym => {
    return (
      <li key={gym.name}>
        <Link to={`${url}/${gym.id}`}>{gym.name}</Link>
      </li>
    )
  })
}

const Navbar = (props) => {
  return (
    <>
      <div className="navbar-container noprint">
        <div className="navbar">
          <ul className="menu">
            {/* admin link */}
            {
              props.user
                ? <AdminLink user={props?.user} />
                : null
            }

            {/* home link */}
            <li className="parent">
              <Link to="/dashboard">Home</Link>
            </li>

            {/* current  boulder/ropes dropdown */}
            <li className="parent">
              <span>Current</span>
              <ul className="child">
                {/* current boulder dropdown */}
                <li className="parent">
                  <span className="expand">Boulders {'>>'}</span>
                  {/* current boulder dropdown content */}
                  <ul className="child gym-dropdown">
                    {/* each gym in user.gyms */}
                    {
                      props.user
                        ? renderLinks(props.user.gyms, '/distribution/current/boulders')
                        : null
                    }
                  </ul>
                </li>

                {/* current ropes dropdown */}
                <li className="parent">
                  <span className="expand">Ropes {'>>'}</span>
                  {/* current ropes dropdown content */}
                  <ul className="child gym-dropdown">
                    {/* each gym in user.gyms */}
                    {
                      props.user
                        ? renderLinks(props.user.gyms, '/distribution/current/ropes')
                        : null
                    }
                  </ul>
                </li>
              </ul>
            </li>

            {/* ideal dropdown */}
            <li className="parent">
              <span>Ideal</span>
              <ul className="child">
                {/* ideal boulder dropdown */}
                <li className="parent">
                  <span className="expand">Boulders {'>>'}</span>
                  {/* ideal boulder dropdown content */}
                  <ul className="child gym-dropdown">
                    {
                      props.user
                        ? renderLinks(props.user.gyms, '/distribution/ideal/boulders')
                        : null
                    }
                  </ul>
                </li>

                {/* ideal ropes dropdown */}
                <li className="parent">
                  <span className="expand">Ropes {'>>'}</span>
                    {/* ideal ropes dropdown content */}
                  <ul className="child gym-dropdown">
                      {/* ideal route distribution form link */}
                    {
                      props.user
                        ? renderLinks(props.user.gyms, '/distribution/ideal/ropes')
                        : null
                    }
                  </ul>
                </li>
              </ul>
            </li>

            {/* metrics dropdown */}
            <li className="parent">
              <span>Metrics</span>
              {/* metrics dropdown content */}
              <ul className="child gym-dropdown">
                  {/* gym metric link */}
                  {
                    props.user
                      ? renderLinks(props?.user.gyms, '/metrics')
                      : null
                    }
              </ul>
            </li>

            {/* employees link */}
            <li className="parent">
              <Link to="/employees">Employees</Link>
            </li>

            {/* locations dropdown */}
            <li className="parent">
              <Link to="/locations">Locations</Link>
              {/* locations dropdown content */}
              <ul className="child gym-dropdown">
                  {/* location link */}
                  {
                    props.gyms
                      ? renderLinks(props?.gyms, '/locations')
                      : null
                  }
              </ul>
            </li>

            {/* employee info link */}
            <li className="parent">
              <Link to="/employees/edit">Info</Link>
            </li>

            {/* logout link */}
            <NavLogout />
          </ul>
        </div>
      

        <div className="mobile-navbar">
          <nav className="navigation" role="navigation">
            <input id="toggle1" type="checkbox" />
            <label className="hamburger1" htmlFor="toggle1">
              <div className="top" />
              <div className="meat" />
              <div className="bottom" />
            </label>   

            <nav className="menu1">
              <a className="link1" href="/">Home</a>
              <a className="link1" href="/editInfo">Info</a>
              <a className="link1" href="/gyms">Locations</a>
              <a className="link1" href="/employees">Employees</a>
              <a className="link1" href="/logout">Logout</a>
            </nav>
          </nav>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(Navbar)



// fix mobile navbar issue