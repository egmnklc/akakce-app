import { Button, Form, Segment } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import { ChangeEvent, useState } from "react";

interface Props {
  product: Product | undefined;
  closeForm: () => void;
  createOrEdit: (product: Product) => void;
  submitting: boolean;
}

export default function ProductForm({ product: selectedProduct, closeForm, createOrEdit, submitting }: Props) {
  const initialState = selectedProduct ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    campaign: "",
  };

  const [product, setProduct] = useState(initialState);

  function handleSubmit(){
    createOrEdit(product)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = event.target;
    setProduct({...product, [name]: value})
  }


  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder="Title" value={product.title} name='title' onChange={handleInputChange}/>
        <Form.TextArea placeholder="Description" value={product.description} name='description' onChange={handleInputChange}/>
        <Form.Input placeholder="Category" value={product.category} name='category' onChange={handleInputChange}/>
        <Form.Input type='date' placeholder="Date" value={product.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder="Campaign" value={product.campaign} name='campaign' onChange={handleInputChange}/>
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
