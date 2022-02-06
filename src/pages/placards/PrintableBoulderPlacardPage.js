import { useLocation } from "react-router-dom"

import Navbar from '../../components/navbar/Navbar'
import PrintableBoulderCard from '../../components/placards/PrintableBoulderCard'

const PrintableBoulderPlacard = () => {
  const location = useLocation()
  const { distribution } = location.state

  return (
    <div>
      <Navbar />
      <PrintableBoulderCard distribution={distribution} />
    </div>
  )
}

export default PrintableBoulderPlacard