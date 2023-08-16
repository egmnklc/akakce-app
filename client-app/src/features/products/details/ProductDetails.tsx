import { Button, Card, Image, Label } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";

interface Props {
  product: Product;
  cancelSelectProduct: () => void;
  openForm: (id: string) => void;
}

export default function ProductDetails({ product, cancelSelectProduct, openForm }: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${product.category}.jpg`} />
      <Card.Content>
        <Card.Header>{product.title}</Card.Header>
        <Card.Meta>
          <span>{product.date}</span>
        </Card.Meta>
        <Card.Description>{product.description}</Card.Description>
        <Label as='a' tag>{product.campaign}</Label>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button onClick={() => openForm(product.id)} basic color="blue" content="Edit" />
          <Button onClick={cancelSelectProduct} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
