import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import { SyntheticEvent, useState } from "react";

interface Props {
  products: Product[];
  selectProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
  submitting: boolean;
}

export default function ProductList({
  products,
  selectProduct,
  deleteProduct,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleProductDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    console.log("Setting target:", e.currentTarget.name);
    deleteProduct(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {products.map((product) => (
          <Item key={product.id}>
            <Item.Content>
              <Item.Header as="a">{product.title}</Item.Header>
              <Item.Meta>{product.date}</Item.Meta>
              <Item.Description>
                <div>{product.description}</div>
                <div>{product.category}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectProduct(product.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={product.id}
                  loading={submitting && target === product.id}
                  onClick={(e) => handleProductDelete(e, product.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={product.campaign} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
