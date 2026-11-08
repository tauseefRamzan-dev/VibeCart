import Hero from './Hero'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Products from '../../../components/Products'
import { Helmet } from 'react-helmet-async'
const index = () => {
  return (
    <>
    <Helmet>
  <title>VibeCart | Online Shopping for Fashion, Tech & More</title>
  <meta name="description" content="Welcome to VibeCart. Discover the best deals on trending products." />
  <link rel="canonical" href="https://www.vibecart.com/" />
</Helmet>
    <Header/>
    <Hero/>
    <Products/>
    <Footer/>
    </>
  )
}

export default index