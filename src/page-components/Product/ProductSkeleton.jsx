import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from '@material-ui/lab'

ProductSkeleton.propTypes = {
  length: PropTypes.number
}

function ProductSkeleton({ length = 10 }) {
  return (
    <div className="flex flex-wrap">
      {Array.from(new Array(length)).map((item, index) => (
        <div
          className="flex-[0_0_20%] max-w-[20%] px-[5px] my-[5px]"
          key={index}
        >
          <Skeleton variant="rect" height={150} width="100%" />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" />
        </div>
      ))}
    </div>
  )
}

export default ProductSkeleton
