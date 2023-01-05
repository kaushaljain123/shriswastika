import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const DashboardLink = () => {
  return (
    <div className='dashboard-links'>
        <Link to='/admin/userlist'><button className='form-btn'>Users</button></Link>
        <Link to='/admin/orderlist'><button className='form-btn'>Orders</button></Link>
        <Link to='/admin/productlist'><button className='form-btn'>Products</button></Link>
        <Link to='/admin/manageImage'><button className='form-btn'>Banner</button></Link>
    </div>
  )
}

export default DashboardLink