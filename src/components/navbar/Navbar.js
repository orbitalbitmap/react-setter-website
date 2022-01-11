import React from 'react'

const adminLink = (user) => {
  if (user.roleId <= 3) {
    return (
      <li className="parent">
        <a href="/admin">Admin</a>
      </li>
    )
  }

  return null
}

const renderLinks = (gymList = [], url) => {
  return gymList.map(gym => {
    return (
      <li key={gym.name}>
        <a href={`${url}/${gym.id}`}>{gym.name}</a>
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
            {adminLink(props.user)}

            {/* home link */}
            <li className="parent">
              <a href="/dashboard">Home</a>
            </li>

            {/* current dropdown */}
            <li className="parent">
              <span>Current</span>
              <ul className="child">
                {/* current boulder dropdown */}
                <li className="parent">
                  <span className="expand">Boulders {'>>'}</span>
                  {/* current boulder dropdown content */}
                  <ul className="child gym-dropdown">
                    {/* each gym in user.gyms */}
                    {renderLinks(props.user.gyms, '/distribution/current/boulders')}
                  </ul>
                </li>

                {/* current ropes dropdown */}
                <li className="parent">
                  <span className="expand">Ropes {'>>'}</span>
                  {/* current ropes dropdown content */}
                  <ul className="child gym-dropdown">
                    {/* each gym in user.gyms */}
                    {renderLinks(props.user.gyms, '/distribution/current/ropes')}
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
                    {renderLinks(props.user.gyms, '/distribution/ideal/boulders')}
                  </ul>
                </li>

                {/* ideal ropes dropdown */}
                <li className="parent">
                  <span className="expand">Ropes {'>>'}</span>
                    {/* ideal ropes dropdown content */}
                  <ul className="child gym-dropdown">
                      {/* ideal route distribution form link */}
                    {renderLinks(props.user.gyms, '/distribution/ideal/ropes')}
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
                  {renderLinks(props.user.gyms, '/metrics')}
              </ul>
            </li>

            {/* employees link */}
            <li className="parent">
              <a href="/employees">Employees</a>
            </li>

            {/* locations dropdown */}
            <li className="parent">
              <a href="/locations">Locations</a>
              {/* locations dropdown content */}
              <ul className="child gym-dropdown">
                  {/* location link */}
                  {renderLinks(props.gyms, '/locations')}
              </ul>
            </li>

            {/* employee info link */}
            <li className="parent">
              <a href="/employees/editInfo">Info</a>
            </li>

            {/* logout link */}
            <li className="parent">
              <a href="/logout">Logout</a>
            </li>
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

export default Navbar



// fix mobile navbar issue