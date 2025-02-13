"use client"

import { memo } from "react";


const InputDateForm = memo(
    ({formId, dateValue, setStateFunc}: {formId: string, dateValue: string, setStateFunc: React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <input
      type="date"
      className="form rounded-md"
      value={dateValue}
      onChange={(e)=>{setStateFunc(e.target.value)}}
    />
  );
});

export default InputDateForm;
