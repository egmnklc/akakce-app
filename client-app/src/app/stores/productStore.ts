import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/product";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { useStore } from "./store";

export default class ProductStore {
  productRegistry = new Map<string, Product>();
  selectedProduct: Product | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  constructor() {
    makeAutoObservable(this);
  }

  get productsByCategory() {
    return Array.from(this.productRegistry.values()).sort((a, b) => {
      // If you want to sort in ascending order:
      return a.category.localeCompare(b.category);

      // If you want to sort in descending order:
      // return b.Category.localeCompare(a.Category);
    });
  }

  get groupedProducts() {
    return Object.entries(
      this.productsByCategory.reduce((products, product) => {
        const category = product.category;
        products[category] = products[category]
          ? [...products[category], product]
          : [product];
        return products;
      }, {} as { [key: string]: Product[] })
    );
  }

  loadProducts = async () => {
    this.setLoadingInitial(true);
    try {
      const products = await agent.Products.list();
      runInAction(() => {
        products.forEach((product) => {
          this.setProduct(product);
        });
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  loadUserProducts = async () => {
    this.setLoadingInitial(true); // Set the loading state

    // Assuming you have a UserStore with a currentUser property
    const userStore = useStore().userStore;
    const username = userStore.getUsername;

    // Check if username is present
    if (!username) {
      console.error("No username found. Ensure user is logged in.");
      this.setLoadingInitial(false);
      return;
    }

    try {
      const products = await agent.Products.userproducts(username);
      runInAction(() => {
        products.forEach((product) => {
          this.setProduct(product);
        });
        this.setLoadingInitial(false);
      });
    } catch (err) {
      console.error("Error loading user's products:", err);
      this.setLoadingInitial(false);
    }
  };

  loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.selectedProduct = product;
      return product;
    } else {
      this.setLoadingInitial(true);
      try {
        product = await agent.Products.details(id);
        this.setProduct(product);
        runInAction(() => {
          this.selectedProduct = product;
        });
        this.setLoadingInitial(false);
        return product;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setProduct = (product: Product) => {
    product.date = new Date(product.date!);
    this.productRegistry.set(product.id, product);
  };

  private getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createProduct = async (product: Product, ownerId: string) => {
    this.loading = true;
    product.id = uuid();
    product.owner = ownerId;
    console.log(product.owner);
    const response = await agent.Products.create(product);
    console.log("Server response:", response);

    try {
      runInAction(() => {
        this.productRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.loading = false;
      });
      console.log("Server response:", response);
    } catch (error) {
      console.log("Server response:", response);
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateProduct = async (product: Product) => {
    this.loading = true;
    try {
      await agent.Products.update(product);
      runInAction(() => {
        this.productRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteProduct = async (id: string) => {
    this.loading = true;
    try {
      await agent.Products.delete(id);
      runInAction(() => {
        this.productRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
