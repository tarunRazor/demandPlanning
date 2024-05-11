export default function TextArea({rows,placeholder,label,name}) {
    return (
      <div>

        {label && <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
         {label}
        </label>}
        <div className="mt-2">
          <textarea
            type={'textarea'}
            name={name}
            rows={rows}
            placeholder={placeholder}
            className="block w-full rounded-md  py-1.5 border border-border-subtle placeholder:text-border-subtle  focus:ring-inset focus:ring-primary font-normal  focus:ring-0 min-h-[40px] text-heading text-subtitle"
           
          > </textarea>
        </div>
      </div>
    )
  }