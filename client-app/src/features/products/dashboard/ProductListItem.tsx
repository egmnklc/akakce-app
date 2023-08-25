import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/products/${product.id}`}>
                {product.title}
              </Item.Header>
              <Item.Description>Added by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary>Shop followers go here</Segment>
      <Segment>
        <span>Product specs: {product.description}</span>
      </Segment>
      <Segment clearing>
        <span>
          <Icon name="clock" /> {product.date}
        </span>
        <Button
          as={Link}
          to={`/products/${product.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
