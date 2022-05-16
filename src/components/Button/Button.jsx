import React from 'react'

export default function Button(props) {
  const { type = 'button', text } = props
  return (
    <button
      type={type}
      className="bg-green-500 px-5 py-4 text-white hover:bg-green-700 duration-300"
    >
      {text}
    </button>
  )
}
