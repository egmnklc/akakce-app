import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../app/models/product";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "./MyTextArea";
import MySelectInput from "./MySelectInput";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import MyDateInput from "./MyDateInput";
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
    date: null,
    description: "",
    category: "",
    campaign: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The product title is required"),
    description: Yup.string().required("The product description is required"),
    date: Yup.string().required("The product date is required").nullable(),
    category: Yup.string().required("The product category is required"),
    campaign: Yup.string().required("The product campaign is required"),
  });

  useEffect(() => {
    if (id) loadProduct(id).then((product) => setProduct(product!));
  }, [id, loadProduct]);

  function handleFormSubmit(product: Product) {
    if (!product.id) {
      product.id = uuid();
      createProduct(product).then(() => navigate(`/products/${product.id}`));
    } else {
      updateProduct(product).then(() => navigate(`/products/${product.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading products..." />;

  return (
    <Segment clearing>
      <Header content="Product Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={product}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
            />
            <Header content="Campaign Details" sub color="teal" />
            <MyTextInput placeholder="Campaign" name="campaign" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/products"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
