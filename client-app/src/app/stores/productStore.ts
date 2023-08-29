import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/product";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

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
      }, {} as {[key: string]: Product[]})
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

  createProduct = async (product: Product) => {
    this.loading = true;
    product.id = uuid();
    try {
      await agent.Products.create(product);
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
