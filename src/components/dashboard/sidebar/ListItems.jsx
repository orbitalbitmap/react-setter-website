import {useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip, 
} from '@mui/material'
import {
  ExpandMore,
  ExpandLess,
  Layers,
} from '@mui/icons-material'
import sideNavList from './sideNavList'
import Logout from '../logout/Logout'
import AdminLink from '../navAdmin/NavAdmin'

const ItemList = ({ drawerOpen, drawerSetter }) => {
  const user = useSelector(state => state.user);
  const locations = useSelector(state => state.locations)
  const [expandAllLocations, setExpandAllLocations] = useState(false)
  const [expandMetrics, setExpandMetrics] = useState(false)
  const [expandUserLocations, setExpandUserLocations] = useState(false)

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
      drawerSetter(true)
      setter(true)
    }

  const renderCollapsableList = (listItem, baseUrl, subList, opener, setter) => {
    if (!subList) {
      console.log({subList, listItem});
      return [];
    }

    return (
      <Fragment key={listItem.id}>
        <Tooltip key={listItem.id} title={listItem.title} disableInteractive>
          <ListItemButton key={listItem.id} onClick={() => {!drawerOpen ? toggleDrawerAndList(setter) : setter(!opener)}}>
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
      </Fragment>
    )
  }

  const renderList = (list) => list.map((listItem) => {
    switch (listItem.title) {
      case 'Locations':
        return renderCollapsableList(listItem, '/locations/', locations, expandAllLocations, setExpandAllLocations)
    case 'Metrics':
      return renderCollapsableList(listItem, '/metrics/', user?.gyms, expandMetrics, setExpandMetrics)
    default:
      return renderListItemWithLink(listItem)
    }
  })

  useEffect(() => {
    if (!drawerOpen) {
      setExpandAllLocations(false)
      setExpandMetrics(false)
      setExpandUserLocations(false)
    }
  }, [drawerOpen])

  return (

    <Fragment>
      <AdminLink />
      {
        renderList(sideNavList)
      }
      <Link key={6} to={`/employees/edit/${user.id}`} style={{textDecoration: 'none'}}>
        <Tooltip title="Profile" disableInteractive >
          <ListItemButton>
            <ListItemIcon>
              <Layers />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Logout />
      <Divider sx={{ my: 1 }} />
      {
        renderCollapsableList(
          { id: 8, title: 'Your Locations'},
          '/locations/',
          user?.gyms,
          expandUserLocations,
          setExpandUserLocations
        )
      }
    </Fragment>
  )
}

export default ItemList;