import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ProductFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 28}}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All products" />
        <Menu.Item content="I'm buying" />
        <Menu.Item content="I'm selling" />
      </Menu>
      <Calendar/>
      <Header />
    </>
  );
}
