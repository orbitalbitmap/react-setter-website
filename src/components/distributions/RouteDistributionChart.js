import React from 'react'
import axios from 'axios'

import DateInput from './DateInput'
import SectionsList from './SectionsList'
import SelectionContainer from './SelectionContainer'


class RouteDistributionChart extends React.Component {
  constructor(props) {
    super(props)

    const todayFormatted = new Date()

    this.state = {
      currentSection: 1,
      distribution: [],
      employeeList: [],
      gymId: null,
      gymName: null,
      sectionDistribution: [],
      sectionList: [],
      today: todayFormatted,
      fullDateChange: todayFormatted.toISOString().split('T')[0],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeAllDatesInSection = this.handleChangeAllDatesInSection.bind(this)
    this.handleDateInputChange = this.handleDateInputChange.bind(this)
    this.handleSectionChange = this.handleSectionChange.bind(this)
  }

  handleSectionChange(event) {
    const sectionId = parseInt(event.target.id)
    const filteredDistribution = this.state.distribution.filter(climb => climb.sectionId === sectionId)

    this.setState({
      currentSection: sectionId,
      sectionDistribution: filteredDistribution.sort((climbA, climbB) => climbA - climbB)
    })
  }

  handleChangeAllDatesInSection(event) {
    const currentDistribution = [...this.state.distribution]

    const newDistribution = currentDistribution.map( climb => {
      if (climb.sectionId === this.state.currentSection) {
        climb.dateSet = this.state.fullDateChange
      }
      return climb
    })
    
    this.setState({
      distribution: newDistribution,
    })

  }

  handleDateInputChange(event) {
    this.setState({
      fullDateChange: event.target.value
    })
  }

  async handleChange(event) {
    const value = event.target.name === "sectionId" || event.target.name === "station"
      ? parseInt(event.target.value)
      : event.target.value

    const climbId = parseInt(event.target.id)
    let distribution = [...this.state.distribution]
    
    distribution[climbId - 1][event.target.name] = value
    
    const filteredDistribution = await distribution.filter(climb => climb.sectionId === this.state.currentSection)

    this.setState({
      distribution,
      sectionDistribution: filteredDistribution.sort((climbA, climbB) => climbA - climbB),
    })
}

  async componentDidMount() {
    const climbInfoList = await axios.get('http://localhost:1337/api/currentRouteGrades/1')
    const sectionList = await axios.get('http://localhost:1337/api/routeSections/1')
    const gymInfo = await axios.get('http://localhost:1337/api/gyms/worcester')

    const filteredDistribution = climbInfoList.data.filter(climb => climb.sectionId === this.state.currentSection)

    this.setState({
      distribution: climbInfoList.data,
      gymId: gymInfo.data.gymId,
      gymName: gymInfo.data.name,
      employeeList: gymInfo.data.employees,
      sectionList: sectionList.data,
      sectionDistribution: filteredDistribution.sort((climbA, climbB) => climbA - climbB),
    })
  }

  render() {
    return (
      <>
          <h1 className="centered-text">Distribution Spread for {this.state.gymName}</h1>

          <div className="section-selectors-container centered-text">
            {
              this.state.sectionList
                ? <SectionsList sectionList={this.state.sectionList} onClick={this.handleSectionChange}/>
                : null
            }
          </div>

          <div className="distribution-holder">
                  <form action="/api/saveDistribution/currentRoutes" method="POST" name="distribution-table">
                    <div className="date-udpater-container">
                      <input className="gray-background date-updater" type="date" name="dateSet" onChange={this.handleDateInputChange} value={this.state.fullDateChange} />
                      <button className="date-updater button" type="button" onClick={this.handleChangeAllDatesInSection}>
                        Set Current Dates
                      </button>
                    </div>

                    <table className="distribution-table">
                      <thead>
                        <tr className="distribution-tr">
                        <th className="distribution-th">Station</th>
                        <th className="distribution-th">Location</th>
                        <th className="distribution-th">Rope Style</th>
                        <th className="distribution-th">Grade</th>
                        <th className="distribution-th">Color</th>
                        <th className="distribution-th">Setter</th>
                        <th className="distribution-th">Name</th>
                        <th className="distribution-th">Date</th>
                        <th className="distribution-th">Days Old</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                        {
                          this.state.sectionDistribution.map(climb => {
                            return (
                              <React.Fragment key={`table-row-${climb.id}`}>
                                <tr className={`climb${climb.id} distribution-tr ${climb.color.toLowerCase()}`}>
                                  <td className={`distribution-td climb${climb.id} ${climb.color.toLowerCase()}`}>
                                    <input
                                      className="centered-text gray-background station-size"
                                      id={climb.id}
                                      name="station"
                                      onChange={this.handleChange}
                                      value={climb.station}
                                    />
                                  </td>
                                
                                <td className="distribution-td">
                                    <SelectionContainer
                                      climb={climb}
                                      onChange={this.handleChange}
                                      name="sectionId"
                                      list={this.state.sectionList}
                                      textKey="name"
                                      valueKey="id"
                                    />
                                  </td>

                                  <td className="distribution-td">
                                    <SelectionContainer
                                      climb={climb}
                                      onChange={this.handleChange}
                                      name="ropeStyle"
                                      list={['Top Rope Only', 'Lead Only', 'Auto Belay Only', 'TR/Lead']}
                                      textKey="ropeStyle"
                                      valueKey="ropeStyle"
                                    />
                                  </td>
                                  
                                  <td className="distribution-td">
                                    <SelectionContainer
                                      climb={climb}
                                      onChange={this.handleChange}
                                      name="grade"
                                      list={['Ungraded', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10-', '5.10', '5.10+', '5.11-', '5.11', '5.11+', '5.12-', '5.12', '5.12+', '5.13-', '5.13', '5.13+', '5.14-', '5.14', '5.14+', '5.15-', '5.15', '5.15+']}
                                      textKey="grade"
                                      valueKey="grade"
                                    />
                                  </td>

                                  <td className="distribution-td">
                                    <SelectionContainer
                                      climb={climb}
                                      onChange={this.handleChange}
                                      name="color"
                                      list={['White', 'Green', 'Black', 'Orange', 'Blue', 'Yellow', 'Red', 'Purple', 'Tan', 'Pink']}
                                      textKey="color"
                                      valueKey="color"
                                    />
                                  </td>

                                  <td className="distribution-td">
                                    <SelectionContainer
                                      climb={climb}
                                      onChange={this.handleChange}
                                      name="setter"
                                      list={this.state.employeeList}
                                      textKey="setter"
                                      valueKey="setter"
                                    />
                                  </td>

                                  <td className={`distribution-td climb${climb.id} ${climb.color.toLowerCase()}`}>
                                    <input
                                      className="centered-text gray-background"
                                      id={climb.id}
                                      name="climbName"
                                      onChange={this.handleChange}
                                      value={climb.climbName}
                                    />
                                  </td>

                                  <td className="distribution-td">
                                    <DateInput climb={climb} onChange={this.handleChange}/>
                                  </td>

                                  {/* //- 86400000 milliseconds in a day */}
                                  <td className={`climb${climb.id} distribution-td ${climb.color.toLowerCase()}`}>{Math.floor((this.state.today - Date.parse(climb.dateSet)) / (86400000))}</td>
                                </tr>
                              </React.Fragment>
                            )
                          })
                        }
                      </tbody>
                    </table>
                    <div className="distribution-button-container">
                      <button className="distribution-button" type="submit">Save Distribution</button>
                      <button className="distribution-button" type="submit" formAction={`/placards/${this.state.gymId}/routes`}>Print Routes Placards</button>
                    </div>
                  </form>
          </div>
      </>
    )
  }
}            

export default RouteDistributionChart
