import React from 'react'

const SectionsList = (props) => {
  return (
    props.sectionList.map(section => {
      return (
        <div key={`section-${section.id}`}>
          <span
            id={section.id}
            className="section-selectors"
            onClick={props.onClick}
          >
            {section?.name}
          </span>
        </div>
      )
    })
  )
}

export default SectionsList