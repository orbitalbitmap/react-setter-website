import React from 'react'

class SelectionContainer extends React.Component {
  render() {
    return (
      <select 
        className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} 
        value={this.props.climb[this.props.name]}
        onChange={this.props.onChange} 
        id={this.props.climb.id} 
        name={this.props.name}
      >
        {
          this.props.list.map(item => {
            return this.props.textKey ==='color' || this.props.textKey ==='grade'
            ? (<option key={`${this.props.textKey}-${item}-${this.props.climb.id}`} className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} onChange={this.props.onChange} id={this.props.name} value={item[this.props.valueKey]}>{item}</option>)
            : (<option key={`${this.props.textKey}-${item[this.props.valueKey]}-${this.props.climb.id}`} className={`climb${this.props.climb.id} ${this.props.climb.color.toLowerCase()}`} onChange={this.props.onChange} id={this.props.name} value={item[this.props.valueKey]}>{item[this.props.textKey]}</option>)
          })
        }
      </select>
    )
  }
}

export default SelectionContainer