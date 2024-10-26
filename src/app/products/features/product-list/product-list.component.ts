import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import {PanierService} from "../../../shared/services/panier.service";
import Swal from 'sweetalert2';
import {PaginatorModule} from "primeng/paginator";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, PaginatorModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  public totalProducts = 0;
  public itemsPerPage = 5;
  public currentPage = 0;
  public paginatedProducts: Product[] = [];
  public productsArray: Product[] = [];
  public filteredProducts: Product[] = [];
  public searchTerm: string = '';
  constructor(private panierService : PanierService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productsService.get().subscribe((products) => {
      this.productsArray = products;
      this.filteredProducts = products;
      this.totalProducts = products.length;
      this.paginateProducts();
    });
  }

  private paginateProducts() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
  public onSearchChange() {
    this.filterProducts();
    this.currentPage = 0;
    this.paginateProducts();
  }

  private filterProducts() {
    this.filteredProducts = this.productsArray.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalProducts = this.filteredProducts.length;
  }

  public onPageChange(event: any) {
    this.currentPage = event.page;
    this.itemsPerPage = event.rows;
    this.paginateProducts();
  }


  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  onAddToPanier(product: Product) {
      this.panierService.addToPanier(product);
      this.showSuccess("Produit ajouter au panier avec suceee")

  }

  public showSuccess(message: string | any) {
    Swal.fire({
      icon: 'success',
      title: message,
    });
  }
}
