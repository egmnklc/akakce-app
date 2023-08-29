import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const productImageStyle = {
  filter: "brightness(30%)",
};
// position: absolute => it is absolutely positioned against its parent div
const productImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "1%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  product: Product;
}

export default observer(function ProductDetailedHeader({ product }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${product.category}.jpg`}
          fluid
          style={productImageStyle}
        />
        <Segment style={productImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={product.title}
                  style={{ color: "white" }}
                />
                <p>{format(new Date(product.date!), 'dd MMM yyyy')}</p>
                <p>
                  Added by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join product</Button>
        <Button>Cancel attendance</Button>
        <Button as={Link} to={`/manage/${product.id}`} color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
});
