import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch } from 'react-redux'
import { getIncomeByMonth } from '../../page-components/Admin/admin.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { formatMoney } from 'src/utils/helper'

export default function AdminChart() {
  const dispatch = useDispatch()
  const [incomeByMonth, setIncomeByMonth] = useState([])

  useEffect(() => {
    const _getIncomeByMonth = async () => {
      const res = await dispatch(getIncomeByMonth())
      const { data } = unwrapResult(res)
      setIncomeByMonth(data)
      console.log(data)
    }
    _getIncomeByMonth()
  }, [dispatch])

  let dataChart = [...Array(12)].fill(0)
  incomeByMonth.length &&
    incomeByMonth.forEach(value => {
      if (value.year === 2022) {
        dataChart[value.month - 1] = value.totalSaleAmount
      }
    })

  const chartOptions = {
    color: ['#6ab04c'],
    chart: {
      background: ['#fff']
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yaxis: {
      labels: {
        formatter: value => formatMoney(value)
      }
    },
    legend: {
      position: 'top'
    },
    grid: {
      show: false
    }
  }

  const chartSeries = [
    {
      name: 'Income',
      data: dataChart
    }
  ]

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height="100%"
    />
  )
}
