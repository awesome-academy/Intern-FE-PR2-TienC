import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import StatusCard from '../../components/StatusCard/StatusCard'
import { formatMoney } from '../../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { getIncome, getTotalSales } from './admin.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import AdminChart from '../../components/AdminChart/AdminChart'
import TopCustomers from '../../components/TopCustomers/TopCustomers'
import LatestOrders from '../../components/LatestOrders/LatestOrders'

export default function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIncome()).then(unwrapResult)
    dispatch(getTotalSales()).then(unwrapResult)
  }, [dispatch])

  const income = useSelector(state => state.admin.income)
  const totalSales = useSelector(
    state => state.admin.totalSales
  ).reduce((sum, current) => sum + current.sold, 0)

  return (
    <>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-gray-700">
          Dashboard
        </h1>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <div className="flex flex-col gap-[16px]">
              <StatusCard
                icon="bx bx-shopping-bag"
                count={`${formatMoney(totalSales)}`}
                title="Total sales"
              />
              <StatusCard
                icon="bx bx-dollar-circle"
                count={`${formatMoney(income)}đ`}
                title="Total income"
              />
            </div>
          </Grid>
          <Grid item xs={7}>
            <AdminChart />
          </Grid>
          <Grid item xs={5}>
            <TopCustomers />
          </Grid>
          <Grid item xs={7}>
            <LatestOrders />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
