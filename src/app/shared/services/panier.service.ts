import { Injectable, inject, signal } from "@angular/core";
import {Product} from "../../products/data-access/product.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root"
}) export class PanierService {

  private panierProducts: Product[] = [];
  private panierSubject = new BehaviorSubject<number>(0);
  panierCount$ = this.panierSubject.asObservable();
  addToPanier(product: Product) {
    const existingProduct = this.panierProducts.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.panierProducts.push({ ...product, quantity: 1 });
    }
    this.panierSubject.next(this.getTotalPanierProducts());
  }

  removeFromPanier(productId: number) {
    this.panierProducts = this.panierProducts.filter(product => product.id !== productId);
    this.panierSubject.next(this.getTotalPanierProducts());
  }

  getPanierProduct() {
    return this.panierProducts;
  }

  getTotalPanierProducts() {
    return this.panierProducts.reduce((total, product) => total + product.quantity, 0);
  }
}
