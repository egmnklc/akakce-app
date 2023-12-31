import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { Link, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

interface Props {
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  const { userStore } = useStore();
  if (userStore.isLoggedIn) {
    console.log(userStore.getUsername, userStore.isAdmin);
  }
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              src={`/assets/categoryImages/${product.category}.jpg`}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/products/${product.id}`}>
                {product.title}
              </Item.Header>
              <Item.Description>
                Added by {product.owner ? product.owner : "System"}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>Product specs: {product.description}</span>
      </Segment>
      <Segment>
        <span>Campaign: Campaign here</span>
      </Segment>
      <Segment clearing>
        <span>
          <Icon name="clock" />{" "}
          {format(new Date(product.date!), "dd MMM yyyy h:mm aa")}
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
