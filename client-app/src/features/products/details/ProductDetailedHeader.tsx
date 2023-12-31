import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

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
  const { userStore, productStore } = useStore();
  const { deleteProduct, loading } = productStore;

  const loggedInUsername = userStore.getUsername;
  const navigate = useNavigate();
  const handleDeleteProduct = async () => {
    try {
      // Redirect user to the list of products after a successful deletion or display a success message.
      deleteProduct(product.id).then(() => navigate("/products"));
    } catch (error) {
      // Display an error message to the user.
      console.log(error);
    }
  };
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
                <p>{format(new Date(product.date!), "dd MMM yyyy")}</p>
                <p>
                  Added by{" "}
                  <strong>{product.owner ? product.owner : "System"}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      {userStore.isAdmin && product.owner === loggedInUsername && (
        <Segment clearing attached="bottom">
          <Button
            as={Link}
            to={`/manage/${product.id}`}
            color="orange"
            floated="right"
          >
            Manage Product
          </Button>
          <Button
            loading={loading}
            color="red"
            floated="right"
            onClick={handleDeleteProduct}
          >
            Delete Product
          </Button>
        </Segment>
      )}
    </Segment.Group>
  );
});
