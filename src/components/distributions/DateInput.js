import React from 'react';

function DateInput(props) {
  return (
    <input
      className="gray-background date"
      data-climbid={props.climb.id}
      name="dateSet"
      onChange={props.onChange}
      type="date"
      value={props.climb.dateSet}
    />
  );
}

export default DateInput;
