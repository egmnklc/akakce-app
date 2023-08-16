import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Product } from "./models/product";
import NavBar from "./NavBar";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Products.list().then((response) => {
      let products: Product[] = [];
      response.forEach((product) => {
        product.date = product.date.split("T")[0];
        products.push(product);
      });
      setProducts(response);
      setLoading(false);
    });
  }, []);

  function handleSelectProduct(id: string) {
    setSelectedProduct(products.find((x) => x.id === id));
  }

  function handleCancelSelectProduct() {
    setSelectedProduct(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectProduct(id) : handleCancelSelectProduct();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditProduct(product: Product) {
    setSubmitting(true);
    if (product.id) {
      agent.Products.update(product).then(() => {
        setProducts([...products.filter((x) => x.id !== product.id), product]);
        setEditMode(false);
        setSelectedProduct(product);
        setSubmitting(false);
      });
    } else {
      product.id = uuid();
      agent.Products.create(product).then(() => {
        setProducts([...products, product]);
        setEditMode(false);
        setSelectedProduct(product);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteProduct(id: string) {
    setSubmitting(true);
    agent.Products.delete(id).then(() => {
      setProducts([...products.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ProductDashboard
          products={products}
          selectedProduct={selectedProduct}
          selectProduct={handleSelectProduct}
          cancelSelectProduct={handleCancelSelectProduct}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditProduct}
          deleteProduct={handleDeleteProduct}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
