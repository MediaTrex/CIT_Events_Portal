import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Search from '../Search'
import Footer from '../Footer'

const HomePage = () => {
  return (
    <div>

      <Navbar />
      <Search />

      <Outlet />
      <Footer />

    </div>
  )
}

export default HomePage
