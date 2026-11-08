import Header from '../../../components/Header'
import Products from '../../../components/Products'
import { Helmet} from 'react-helmet-async';
const index = () => {
  return (
    <>
   <Helmet>
  <title>VibeCart | Explore Our Products</title>
  <meta name="description" content="Browse our wide range of products at affordable prices on VibeCart." />
  <link rel="canonical" href="https://www.vibecart.com/products" />
</Helmet>
    <Header/>
    <Products/>
    </>
  )
}

export default index