import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../app/layout/models/product";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function ProductForm() {
  const { productStore } = useStore();
  const {
    selectedProduct,
    createProduct,
    updateProduct,
    loading,
    loadProduct,
    loadingInitial,
  } = productStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    campaign: "",
  });

  useEffect(() => {
    if (id) loadProduct(id).then((product) => setProduct(product!));
  }, [id, loadProduct]);

  function handleSubmit() {
    if (!product.id) {
      product.id = uuid();
      createProduct(product).then(() => navigate(`/products/${product.id}`));
    } else {
      updateProduct(product).then(() => navigate(`/products/${product.id}`));
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="Loading products..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={product.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={product.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={product.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={product.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Campaign"
          value={product.campaign}
          name="campaign"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button as={Link} to='/products' floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
