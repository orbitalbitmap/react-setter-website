import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGetUserInfo from "../../../../hooks/useGetUserInfo";


const useListItems = (drawerOpen, drawerSetter) => {
  const { userRoleId } = useGetUserInfo();
  const locations = useSelector(state => state.locations);
  const {userLocations} = useGetUserInfo();
  const [expandAllLocations, setExpandAllLocations] = useState(false);
  const [expandMetrics, setExpandMetrics] = useState(false);
  const [expandUserLocations, setExpandUserLocations] = useState(false);

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
  );

    const toggleDrawerAndList = (setter) => {
      drawerSetter(true)
      setter(true)
    }

  const renderCollapsableList = (listItem, baseUrl, subList, isOpen, setter) => {
    if (!subList) {
      return [];
    }

    return (
      <Fragment key={listItem.id}>
        <Tooltip key={listItem.id} title={listItem.title} disableInteractive>
          <ListItemButton key={listItem.id} onClick={() => {!drawerOpen ? toggleDrawerAndList(setter) : setter(!isOpen)}}>
              <ListItemIcon>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              <ListItemText primary={listItem.title} />
          </ListItemButton>
        </Tooltip>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding data-testid={`${listItem.title.toLowerCase()}-list`} >
            <Divider sx={{ my: 1 }} />
              <Link to={baseUrl} style={{textDecoration: 'none'}}>
                <Tooltip title={`All ${listItem.title.toLowerCase()}`} disableInteractive>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="All" sx={{textAlign: 'center'}} />
                  </ListItemButton>
                </Tooltip>
              </Link>
              {
                subList?.map(gym => {
                  return (
                    <Link key={gym.id} to={`${baseUrl}/${gym.id}`} style={{textDecoration: 'none'}}>
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
        return renderCollapsableList(listItem, '/locations', locations, expandAllLocations, setExpandAllLocations)
    case 'Metrics':
      return renderCollapsableList(listItem, '/metrics', userLocations, expandMetrics, setExpandMetrics)
    default:
      return renderListItemWithLink(listItem)
    }
  });

  useEffect(() => {
    if (!drawerOpen) {
      setExpandAllLocations(false)
      setExpandMetrics(false)
      setExpandUserLocations(false)
    }
  }, [drawerOpen]);

  return {
    expandUserLocations,
    userRoleId,
    userLocations,
    renderCollapsableList,
    renderList,
    setExpandUserLocations,
  };
}

export default useListItems;