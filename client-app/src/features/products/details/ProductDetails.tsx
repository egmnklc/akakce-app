import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductDetailedHeader from "./ProductDetailedHeader";
import ProductDetailedInfo from "./ProductDetailedInfo";

export default observer(function ProductDetails() {
  const { productStore } = useStore();
  const {
    selectedProduct: product,
    loadProduct,
    loadingInitial,
  } = productStore;

  const { id } = useParams();

  useEffect(() => {
    if (id) loadProduct(id);
  }, [id, loadProduct]);

  if (loadingInitial || !product) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ProductDetailedHeader product={product} />
        <Button
          as={Link}
          to={"/products"}
          content="Back to products page"
          floated="right"
          color="orange"
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <ProductDetailedInfo product={product} />
      </Grid.Column>
    </Grid>
  );
});
