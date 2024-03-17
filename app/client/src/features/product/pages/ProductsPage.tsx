import ProductList from "../components/ProductList";
import ProductFiler from "../components/ProductFilter";
import Banner from "@/components/banner/Banner";

const ProductsPage: React.FC = () => {
  return (
    <>
      <Banner image="PRODUCTS" />
      <ProductFiler />
      <ProductList />
    </>
  );
};

export default ProductsPage;
