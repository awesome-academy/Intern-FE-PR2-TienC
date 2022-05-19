import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsers } from './admin.slice'
import { unwrapResult } from '@reduxjs/toolkit'

export default function UserAdmin() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const thChildren = ['name', 'email', 'phone', 'address']
  useEffect(() => {
    const _getAllUsers = async () => {
      const res = await dispatch(getAllUsers())
      const data = unwrapResult(res)
      setUsers(data.data)
    }
    _getAllUsers()
  }, [dispatch])
  return (
    <>
      <h1 className="text-2xl mb-5 font-semibold text-gray-700">
        User
      </h1>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {thChildren.map((item, index) => (
              <th
                key={index}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length &&
            users.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.email}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.phone}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {item.address}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
