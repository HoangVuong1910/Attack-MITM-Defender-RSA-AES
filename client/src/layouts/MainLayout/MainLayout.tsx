import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  console.log('RegisterLayout')
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)

export default MainLayout
