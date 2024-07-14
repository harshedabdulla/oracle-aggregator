import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardPage from '../components/Dash'

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </div>
    </>
  )
}

export default Dashboard