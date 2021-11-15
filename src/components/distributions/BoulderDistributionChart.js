import React from 'react'
import axios from 'axios'

import DateInput from './DateInput'
import SectionsList from './SectionsList'
import SelectionContainer from './SelectionContainer'


class BoulderDistributionChart extends React.Component {
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

  async handleSectionChange(event) {
    const sectionId = parseInt(event.target.id)
    const filteredDistribution = this.state.distribution.filter(climb => climb.sectionId === sectionId)

    await this.setState({
      currentSection: sectionId,
      sectionDistribution: filteredDistribution.sort()
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
    const value = event.target.name === "sectionId"
      ? parseInt(event.target.value)
      : event.target.value

    const climbId = parseInt(event.target.id)
    let distribution = [...this.state.distribution]
    
    distribution[climbId - 1][event.target.name] = value
    
    const filteredDistribution = await distribution.filter(climb => climb.sectionId === this.state.currentSection)

    this.setState({
      distribution,
      sectionDistribution: filteredDistribution,
    })
}

  async componentDidMount() {
    const climbInfoList = await axios.get('http://localhost:1337/api/currentBoulderGrades/1')
    const sectionList = await axios.get('http://localhost:1337/api/boulderSections/1')
    const gymInfo = await axios.get('http://localhost:1337/api/gyms/worcester')

    const filteredDistribution = climbInfoList.data.filter(climb => climb.sectionId === this.state.currentSection)

    this.setState({
      distribution: climbInfoList.data,
      gymId: gymInfo.data.gymId,
      gymName: gymInfo.data.name,
      employeeList: gymInfo.data.employees,
      sectionList: sectionList.data,
      sectionDistribution: filteredDistribution,
    })
  }

  render() {
    return (
      <>
        {/* if (gymName !== null) */}
          <h1 className="centered-text">Distribution Spread for {this.state.gymName}</h1>

          <div className="section-selectors-container centered-text">
            {
              this.state.sectionList
                ? <SectionsList sectionList={this.state.sectionList} onClick={this.handleSectionChange}/>
                : null
            }
          </div>

          <div className="distribution-holder">
                  <form action="/api/saveDistribution/currentBoulders" method="POST" name="distribution-table">
                    <div className="date-udpater-container">
                      <input className="gray-background date-updater" type="date" name="dateSet" onChange={this.handleDateInputChange} value={this.state.fullDateChange} />
                      <button className="date-updater button" type="button" onClick={this.handleChangeAllDatesInSection}>
                        Set Current Dates
                      </button>
                    </div>

                    <table className="distribution-table">
                      <thead>
                        <tr className="distribution-tr">
                          <th className="distribution-th"> Grade</th>
                          <th className="distribution-th">Color</th>
                          <th className="distribution-th">Setter</th>
                          <th className="distribution-th">Location</th>
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
                                  <td className="distribution-td">
                                    <SelectionContainer
                                      climb={climb}
                                      onChange={this.handleChange}
                                      name="grade"
                                      list={['VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']}
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
                                      textKey="firstName"
                                      valueKey="firstName"
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
                      <button className="distribution-button" type="submit" formAction={`/placards/${this.state.gymId}/boulders`}>Print Boulder Placards</button>
                      <button className="distribution-button" type="submit" formAction={`/placards/${this.state.gymId}/boulderBash`}>Print Boulder Bash Placard</button>
                    </div>
                  </form>
          </div>

        {/* else
          h2 className="centered-text") No distribution found. */}
      </>
    )
  }
}            

export default BoulderDistributionChart
