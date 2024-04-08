import React from 'react'
import "../css/Dashboard.css"
import SideNav from '../components/SideNav'


export const Dashboard = () => {
  return (
    <>
    <div className='dashboardPage'>
      <SideNav />
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className='dash'>
          <div className='TotalUsers'>
            <h1 className='total_user'>Total Users</h1>
            <p className='show_users'>2</p>

          </div>
          <div className='TotalDistributers'>
            <h1 className='total_distributer'>Total Distributers</h1>
            <p className='show_distributer'>2</p>

          </div>
          <div className='TotalCars'>
            <h1 className='total_cars'>Total Cars</h1>
            <p className='show_cars'>2</p>

          </div>
          <div className='TotalUsers'>
            <h1 className='total_user'>Total Users</h1>
            <p className='show_users'>2</p>

          </div>
        </div>
      </div>
      
    </div>
    
    
    </>
  )
}
