import {Component, OnInit} from '@angular/core';
import {Product} from "../../data-access/product.model";
import {PanierService} from "../../../shared/services/panier.service";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {DataViewModule} from "primeng/dataview";
import {PrimeTemplate} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {ProductFormComponent} from "../../ui/product-form/product-form.component";

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    Button,
    CardModule,
    DataViewModule,
    PrimeTemplate,
    DialogModule,
    ProductFormComponent
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit{
  panierProducts:Product[] = [];

  constructor(private  panierService: PanierService) {
  }

  ngOnInit(): void {
    this.panierProducts = this.panierService.getPanierProduct();

  }
  removeProduct(productId: number) {
    this.panierService.removeFromPanier(productId);
    this.panierProducts = this.panierService.getPanierProduct();
    this.panierService.getTotalPanierProducts();
    console.log(this.panierProducts)

  }
}
