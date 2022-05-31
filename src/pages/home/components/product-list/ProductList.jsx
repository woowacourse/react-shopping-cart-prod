import cn from "classnames";
import { useSelector } from "react-redux";
import ProductItem from "@home/components/product-item/ProductItem";
import styles from "@home/components/product-list/product-list.module";
import { Link } from "react-router-dom";

function ProductList({ className }) {
  const productList = useSelector((state) => state.productList);
  return (
    <div className={cn(styles.productList, className)}>
      {productList.map((item) => (
        <Link key={item.sku} to={`/product/${item.sku}`}>
          <ProductItem {...item} />
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
