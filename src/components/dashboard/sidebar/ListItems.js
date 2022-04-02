import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

import { connect } from 'react-redux'

import sideNavList from './sideNavList'

import Logout from '../logout/Logout'
import AdminLink from '../navAdmin/NavAdmin'


const ItemList = (props) => {
  const [expandAllLocations, setExpandAllLocations] = React.useState(false)
  const [expandMetrics, setExpandMetrics] = React.useState(false)
  const [expandUserLocations, setExpandUserLocations] = React.useState(false)

  const renderListItemWithLink = (listItem) => (
    <Link key={listItem.id} to={listItem.url} style={{textDecoration: 'none'}}>
      <Tooltip title={listItem.title} disableInteractive >
        <ListItemButton>
          <ListItemIcon>
            {listItem.icon}
          </ListItemIcon>
          <ListItemText primary={listItem.title} />
        </ListItemButton>
      </Tooltip>
    </Link>
  )

    const toggleDrawerAndList = (setter) => {
      props.drawerSetter(true)
      setter(true)
    }

  const renderCollapsableList = (listItem, baseUrl, subList, opener, setter) => (
    <React.Fragment key={listItem.id}>
      <Tooltip key={listItem.id} title={listItem.title} disableInteractive>
        <ListItemButton key={listItem.id} onClick={() => {!props.drawerOpen ? toggleDrawerAndList(setter) : setter(!opener)}}>
            <ListItemIcon>
              {opener ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText primary={listItem.title} />
        </ListItemButton>
      </Tooltip>
      <Collapse in={opener} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Divider sx={{ my: 1 }} />
            <Link to={baseUrl} style={{textDecoration: 'none'}}>
              <Tooltip title="All locations" disableInteractive>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="All" sx={{textAlign: 'center'}} />
                </ListItemButton>
              </Tooltip>
            </Link>
            {
              subList?.map(gym => {
                return (
                  <Link key={gym.id} to={`${baseUrl}${gym.id}`} style={{textDecoration: 'none'}}>
                    <Tooltip title={gym.name} disableInteractive>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={gym.name} sx={{textAlign: 'center'}} />
                      </ListItemButton>
                    </Tooltip>
                  </Link>
                )
              })
            }
            <Divider sx={{ my: 1 }} />
        </List>
      </Collapse>
    </React.Fragment>
  )

  const renderList = (list) => list.map((listItem) => {
    switch (listItem.title) {
      case 'Locations':
        return renderCollapsableList(listItem, '/locations/', props?.gyms, expandAllLocations, setExpandAllLocations)
    case 'Metrics':
      return renderCollapsableList(listItem, '/metrics/', props?.user?.gyms, expandMetrics, setExpandMetrics)
    default:
      return renderListItemWithLink(listItem)
    }
  })

  React.useEffect(() => {
    if (!props.drawerOpen) {
      setExpandAllLocations(false)
      setExpandMetrics(false)
      setExpandUserLocations(false)
    }
  }, [props.drawerOpen])

  return (

    <React.Fragment>
      <AdminLink />

      {
        renderList(sideNavList)
      }

      <Logout />

      <Divider sx={{ my: 1 }} />

      {
        renderCollapsableList({id: 8, title: 'Your Locations'}, '/locations/current/', props?.user?.gyms, expandUserLocations, setExpandUserLocations)
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(ItemList)