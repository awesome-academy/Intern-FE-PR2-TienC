import React from 'react'
import Header from 'src/page-components/Header/Header'
import PropTypes from 'prop-types'
export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
