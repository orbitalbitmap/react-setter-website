import React from 'react'

class DistributionEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      distribution: {
        type: 'boulders',
        gymId: 1,
        distributionList: {
          'VB': 4,
          'V0': 5,
          'V1': 5,
          'V2': 4,
          'V3': 6,
          'V4': 5,
          'V5': 4,
          'V6': 7,
          'V7': 9,
          'V8': 9,
          'V9': 8,
          'V10': 6,
          'V11': 2,
          'V12': 1,
          'V13': 0,
          'V14': 0,
          'V15': 0,
          'V16': 0
        }
      }
    }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      distribution: {
        ...this.state.distribution,
        distributionList: {
          ...this.state.distribution.distributionList,
          [event.target.name]: parseInt(event.target.value) || 0
        }
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <form action={`/api/saveDistribution/${this.state.distribution.type}`} method="post" id="distribution-form" >
        <input className="hidden" name="gymId" value={this.state.distribution.gymId} disabled />
        <div className="grid">
          {
            Object.keys(this.state.distribution.distributionList).map(grade => {
              let numberOfGrade = this.state.distribution.distributionList[grade]
              return (
                <div key={grade} className="distribution-form-div">
                  <label className="distribution-form-label" htmlFor={grade}>{grade}:</label>
                  <input
                    onChange={this.handleChange}
                    className="centered-text"
                    style={{width: '2rem'}}
                    name={grade}
                    type="number"
                    value={numberOfGrade}
                  />
                </div>
              )
            })
          }
        </div>
                    <button onClick={this.handleSubmit} type="submit">Save Distribution</button>
      </form>
    )
  }
}
export default DistributionEditForm