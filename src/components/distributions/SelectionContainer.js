import React from 'react'

const SelectionContainer = (props) => {
  return (
    <select 
      className={`climb${props.climb.id} ${props.climb.color.toLowerCase()}`} 
      value={props.climb[props.name]}
      onChange={props.onChange} 
      data-climbid={props.climb.id} 
      name={props.name}
    >
      {
        props.list.map(item => {
          switch (props.textKey) {
            case 'color':
              case 'grade': 
              case 'ropeStyle': 
              return (<option key={`${props.textKey}-${item}-${props.climb.id}`} className={`climb${props.climb.id} ${props.climb.color.toLowerCase()}`} onChange={props.onChange} id={props.name} value={item[props.valueKey]}>{item}</option>)
            case 'setter':
              return item.placardName
                ? (<option key={`${props.textKey}-${item.placardName}-${props.climb.id}`} className={`climb${props.climb.id} ${props.climb.color.toLowerCase()}`} onChange={props.onChange} id={props.name} value={item.placardName}>{item.placardName}</option>)
                : (<option key={`${props.textKey}-${item.firstName}-${props.climb.id}`} className={`climb${props.climb.id} ${props.climb.color.toLowerCase()}`} onChange={props.onChange} id={props.name} value={item.firstName}>{item.firstName}</option>)
            default:
            return (<option key={`${props.textKey}-${item[props.valueKey]}-${props.climb.id}`} className={`climb${props.climb.id} ${props.climb.color.toLowerCase()}`} onChange={props.onChange} id={props.name} value={item[props.valueKey]}>{item[props.textKey]}</option>)
          }
        })
      }
    </select>
  )
}

export default SelectionContainer