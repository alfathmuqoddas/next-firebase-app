import Head from 'next/head'
import Navbar from './Navbar.js'

const Layout = ({children}) => {
    return (
        <>
          <Head>
            <title>Next Firebase App</title>
            <meta name="description" content="Simple Crud App using NextJS and Firebase" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          {children}
        </>
    )
}

export default Layout