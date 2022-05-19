import React, { useState } from 'react'
import Button from 'src/components/Button/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useSelector } from 'react-redux'
import AddCategoryForm from './../../components/AddCategoryForm/AddCategoryForm'

export default function Category() {
  const thChildren = ['', 'name']

  //Categories
  const categories = useSelector(state => state.home.categories)

  //Add Products
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5 ">
        <h1 className="text-2xl font-semibold text-gray-700">
          Categories
        </h1>
        <Button
          type="submit"
          text="ADD CATEGORY"
          onClick={handleClickOpen}
        ></Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Add Category'}
          </DialogTitle>
          <DialogContent>
            <AddCategoryForm />
          </DialogContent>
        </Dialog>
      </div>
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
          {categories.length &&
            categories.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {index + 1}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap line-clamp-1 text-center">
                    {item.name}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
