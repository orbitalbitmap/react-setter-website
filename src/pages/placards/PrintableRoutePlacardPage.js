import { useLocation } from "react-router-dom"
import PrintableRouteCard from '../../components/placards/PrintableRouteCard'
import Dashboard from '../../components/dashboard/Dashboard'

const PrintableBoulderPlacard = () => {
  const location = useLocation()
  const { distribution } = location.state

  return (
    <Dashboard>
      <PrintableRouteCard distribution={distribution} />
    </Dashboard>
  )
}

export default PrintableBoulderPlacard