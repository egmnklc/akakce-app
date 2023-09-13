import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ProductListItem from "./ProductListItem";
import { Fragment } from "react";
import ProductListAdmin from "./ProductListAdmin";

export default observer(function ProductList() {
  const { productStore, userStore } = useStore();
  const { groupedProducts } = productStore;
  const loggedInUsername = userStore.getUsername;

  return (
    <>
      {groupedProducts.map(([group, products]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {products.map((product) => {
            console.log(userStore.isAdmin, product.owner, loggedInUsername);
            // If the user is an admin and the product owner is the logged-in user, display the product
            if (userStore.isAdmin && product.owner === loggedInUsername) {
              return <ProductListAdmin key={product.id} product={product} />;
            } else if (!userStore.isAdmin) {
              return <ProductListItem key={product.id} product={product} />;
            }

            // Otherwise, display the product using ProductListItem
          })}
        </Fragment>
      ))}
    </>
  );
});
