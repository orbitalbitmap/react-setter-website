import { useLocation } from "react-router-dom"

import Navbar from "../../components/navbar/Navbar"

import PrintableRouteCard from '../../components/placards/PrintableRouteCard'

const PrintableBoulderPlacard = () => {
  const location = useLocation()
  const { distribution } = location.state

  return (
    <>
      <Navbar />
      <PrintableRouteCard distribution={distribution} />
    </>
  )
}

export default PrintableBoulderPlacard