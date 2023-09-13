import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

interface Props {
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  const { userStore } = useStore();

  const loggedInUser = userStore.getUsername;
  const isAdmin = userStore.isAdmin;
  
  // If the user is not logged in, don't render anything.
  if (!userStore.isLoggedIn) return null;

  // If the user is not an admin and the product doesn't belong to them, don't render it.
  if (!isAdmin && product.owner !== loggedInUser) return null;

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
              <Item.Description>Added by {product.owner}</Item.Description> {/* Changed from loggedInUser to product.owner */}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>Product specs: {product.description}</span>
      </Segment>
      <Segment>
        Campaign: <Label className="ui tag label teal"> {product.campaign}</Label>
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
