import React from 'react'

const Login = (props) => {
  return props.options.map(item => {
    return (
      <div key={item.name} className="employee-form-grid">
        <label htmlFor={item?.name} form={item?.form}>{`${item?.placeholder}:`}</label>
        <input 
          id={item.id ? item.id : null}
          className={item.className ? item.className : null}
          defaultValue={item.defaultValue ? item.defaultValue : null}
          disabled={item.isDisabled ? item.isDisabled : null}
          form={item.form ? item.form : null}
          name={item.name ? item.name : null}
          placeholder={item.placeholder ? item.placeholder : null}
          required
          type={item.type ? item.type : null}
        />
      </div>
    )
  })
}

export default Login