import React from 'react'
import Routers from '../routes/Routers'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
const Layout = () => {
  return (<>
    <Header />
    <main>
    <Routers/>
    </main>
    <Footer />
  </>
  )
}

export default Layout