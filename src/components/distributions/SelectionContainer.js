import React from 'react'

class SelectionContainer extends React.Component {
  render() {
    return (
      <select 
        className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} 
        value={this.props.climb[this.props.name]}
        onChange={this.props.onChange} 
        data-climbid={this.props.climb.id} 
        name={this.props.name}
      >
        {
          this.props.list.map(item => {
            switch (this.props.textKey) {
              case 'color':
                case 'grade': 
                case 'ropeStyle': 
                return (<option key={`${this.props.textKey}-${item}-${this.props.climb.id}`} className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} onChange={this.props.onChange} id={this.props.name} value={item[this.props.valueKey]}>{item}</option>)
              case 'setter':
                return item.placardName
                  ? (<option key={`${this.props.textKey}-${item.placardName}-${this.props.climb.id}`} className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} onChange={this.props.onChange} id={this.props.name} value={item.placardName}>{item.placardName}</option>)
                  : (<option key={`${this.props.textKey}-${item.firstName}-${this.props.climb.id}`} className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} onChange={this.props.onChange} id={this.props.name} value={item.firstName}>{item.firstName}</option>)
              default:
              return (<option key={`${this.props.textKey}-${item[this.props.valueKey]}-${this.props.climb.id}`} className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} onChange={this.props.onChange} id={this.props.name} value={item[this.props.valueKey]}>{item[this.props.textKey]}</option>)
            }
          })
        }
      </select>
    )
  }
}

export default SelectionContainer