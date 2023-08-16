import { Grid } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import ProductList from "./ProductList";
import ProductDetails from "../details/ProductDetails";
import ProductForm from "../form/ProductForm";

interface Props {
  products: Product[];
  selectedProduct: Product | undefined;
  selectProduct: (id: string) => void;
  cancelSelectProduct: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (product: Product) => void;
  deleteProduct: (id: string) => void;
  submitting: boolean;
}

export default function ProductDashboard({
  products,
  selectedProduct,
  selectProduct,
  cancelSelectProduct,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteProduct,
  submitting
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ProductList
          products={products}
          selectProduct={selectProduct}
          deleteProduct={deleteProduct}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedProduct && !editMode && (
          <ProductDetails
            product={selectedProduct}
            cancelSelectProduct={cancelSelectProduct}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ProductForm
            closeForm={closeForm}
            product={selectedProduct}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
