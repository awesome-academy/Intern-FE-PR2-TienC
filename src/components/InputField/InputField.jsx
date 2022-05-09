import React from 'react'
import { Controller } from 'react-hook-form'

function InputField(props) {
  const { form, type, name, placeholder } = props
  const {
    formState: { errors }
  } = form
  const error = errors[name]

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={field.onChange}
            value={form.getValues(name)}
            className="mt-1 px-6 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        )}
      />
      <span className="text-xs text-red-600 pl-2">
        {error && error.message}
      </span>
    </>
  )
}

export default InputField
