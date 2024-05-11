import React, { useState } from 'react'
export default function Example({type,placeholder,label,name,DefaultValue}) {
  const [value, setValue] = useState('');
    return (
      <div>

        {label && <label htmlFor="email" className="block text-subtitle font-medium leading-6 text-gray-900">
          Email
        </label>}
        <div className="mt-2">
          <input
            type={type}
            name={name}
            value={DefaultValue ? DefaultValue : value}
            onChange={(e) => setValue(e.target.value)}
            className="block w-full rounded-md  py-1.5 border border-border-subtle placeholder:text-border-subtle  focus:ring-inset focus:ring-primary font-normal  focus:ring-0 min-h-[40px] text-heading text-subtitle"
            placeholder={placeholder}
          />
        </div>
      </div>
    )
  }