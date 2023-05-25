import{ useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import { useSelector } from 'react-redux';


const GymTabContainer = ({ gym }) => {
  const { ropePanel, boulderPanel, sectionPanel } = useSelector(state => state.gymTabPanel)
  const [value, setValue] = useState(0);

  return (
    <>
      <Tabs
        value={value}
        onChange={(event, newValue) => {setValue(newValue)}}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        sx={{bgcolor: 'primary.light'}} style={{borderRadius: '4px 4px 0 0'}}
      >
        <Tab label="Ropes" />
        <Tab label="Boulders" />
        <Tab label="Sections" />
      </Tabs>
      <TabPanel value={value} index={0} id={gym.id} panelInfo={ropePanel} />
      <TabPanel value={value} index={1} id={gym.id} panelInfo={boulderPanel} />
      <TabPanel value={value} index={2} id={gym.id} panelInfo={sectionPanel} />
    </>
  )
}

export default GymTabContainer