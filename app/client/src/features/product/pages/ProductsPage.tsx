import ProductCard from '../components/ProductCard';
import ProductBanner from '../components/ProductBanner';
import ProductFiler from '../components/ProductFiler';

const ProductsPage: React.FC = () => {
  
  return (
    <>
      <ProductBanner />
      <ProductFiler />
      <ProductCard />
    </>
  );
};

export default ProductsPage;
