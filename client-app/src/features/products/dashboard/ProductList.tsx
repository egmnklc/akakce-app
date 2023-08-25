import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ProductListItem from "./ProductListItem";
import { Fragment } from "react";

export default observer(function ProductList() {
  const { productStore } = useStore();
  const { groupedProducts } = productStore;

  return (
    <>
      {groupedProducts.map(([group, products]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
