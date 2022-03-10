import React from 'react'

const SectionsList = (props) => {
  return (
    props.sectionList.map(section => {
      const isSelected = props.currentSelectedId === section.id ? 'selected' : null
      return (
        <div key={`section-${section.id}`}>
          <span
            id={section.id}
            className={`section-selectors ${isSelected}`}
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