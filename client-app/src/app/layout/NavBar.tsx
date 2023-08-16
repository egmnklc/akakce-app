import { Button, Container, Menu } from "semantic-ui-react";

interface Props{
  openForm: () => void;
}

export default function NavBar({openForm}: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
          Product-Compare
        </Menu.Item>
        <Menu.Item name="Products" />
        <Menu.Item>
            <Button onClick={openForm} positive content='Create Product'/>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
