import { Grid } from "semantic-ui-react";
import ProductList from "./ProductList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ProductFilters from "./ProductFilters";

export default observer(function ProductDashboard() {
  const { productStore } = useStore();
  const { loadProducts, productRegistry } = productStore;

  useEffect(() => {
    if (productRegistry.size <= 1) loadProducts();
  }, [loadProducts, productRegistry]);

  if (productStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ProductList />
      </Grid.Column>
      <Grid.Column width="6">
        <ProductFilters />
      </Grid.Column>
    </Grid>
  );
});
