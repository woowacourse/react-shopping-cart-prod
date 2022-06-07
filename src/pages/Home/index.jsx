import { useEffect } from "react";

import Error from "@/pages/Error";

import Loading from "@/components/Loading";
import Item from "@/components/Item";

import StyledProductList from "@/pages/Home/index.styled";
import useFetch from "@/hooks/useFetch";

function ProductList() {
  const { data, error, success, getData } = useFetch("get", "products");

  useEffect(() => {
    getData();
  }, []);

  if (!success && !error) return <Loading />;
  if (error) return <Error />;

  return (
    <StyledProductList>
      {data.productList &&
        data.productList.map((item) => <Item key={item.id} {...item} />)}
    </StyledProductList>
  );
}

export default ProductList;
