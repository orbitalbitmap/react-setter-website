import { useLocation } from "react-router-dom"

import Dashboard from '../../components/dashboard/Dashboard'
import PrintableBoulderCard from '../../components/placards/PrintableBoulderCard'

const PrintableBoulderPlacard = () => {
  const location = useLocation()
  const { distribution } = location.state

  return (
    <Dashboard>
      <PrintableBoulderCard distribution={distribution} />
    </Dashboard>
  )
}

export default PrintableBoulderPlacard