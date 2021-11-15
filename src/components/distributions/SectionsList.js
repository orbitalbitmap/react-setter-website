import React from 'react'

class SectionsList extends React.Component {
  render() {
    return (
      this.props.sectionList.map(section => {
        return (
          <div key={`section-${section.id}`}>
            <span
              id={section.id}
              className="section-selectors"
              onClick={this.props.onClick}
            >
              {section?.name}
            </span>
          </div>
        )
      })
    )
  }
}

export default SectionsList