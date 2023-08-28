import { createContext } from "react";
import ProductStore from "./productStore";
import { useContext } from "react";
import CommonStore from "./commonStore";

interface Store {
  productStore: ProductStore;
  commonStore: CommonStore;
}

export const store: Store = {
  productStore: new ProductStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
