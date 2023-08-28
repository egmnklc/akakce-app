import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Product } from "../../../app/layout/models/product";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src={`/assets/categoryImages/${product.category}.jpg`} />
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
          <Icon name="clock" /> {format(new Date(product.date!), 'dd MMM yyyy h:mm aa')}
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
