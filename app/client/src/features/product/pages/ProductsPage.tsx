import ProductList from "../components/ProductList";
import ProductBanner from "../components/ProductBanner";
import ProductFiler from "../components/ProductFilter";

const ProductsPage: React.FC = () => {
  return (
    <>
      <ProductBanner />
      <ProductFiler />
      <ProductList />
    </>
  );
};

export default ProductsPage;
