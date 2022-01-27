import { useLocation } from "react-router-dom"

import PrintableBoulderCard from '../../components/placards/PrintableBoulderCard'

const PrintableBoulderPlacard = () => {
  const location = useLocation()
  const { distribution } = location.state

  return (
    <div>
      <PrintableBoulderCard distribution={distribution} />
    </div>
  )
}

export default PrintableBoulderPlacard