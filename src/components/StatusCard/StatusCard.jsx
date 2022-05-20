import React from 'react'

export default function StatusCard(props) {
  return (
    <div className="p-[30px] flex items-center bg-white rounded-2xl">
      <div className="w-[30%] flex items-center justify-center">
        <i className={`${props.icon} text-[50px] text-gray-700`}></i>
      </div>
      <div className="flex flex-col items-center w-[70%]">
        <h4 className="text-[40px] font-bold text-gray-700">
          {props.count}
        </h4>
        <span>{props.title}</span>
      </div>
    </div>
  )
}
