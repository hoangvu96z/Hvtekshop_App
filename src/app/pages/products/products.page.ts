/* eslint-disable quote-props */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/services';
import { ProductService } from 'src/app/services/product.service';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  data: Product[];
  rowData: any[] = [];
  loading = false;
  categories: any[];
  selectedCate  = 'All products';
  constructor(public productService: ProductService,
    private woocommerceProductsService: WoocommerceProductsService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.prepareData();
  }

  prepareData() {
    this.loading  = true;
    forkJoin(this.woocommerceProductsService.getAllProducts(),
      this.woocommerceProductsService.listAllCategories()
    ).subscribe(data => {
      if (data) {
        const [allProducts, categories] = data;
        this.categories = categories;
        this.loadProduct(allProducts);
      }
    });
  }

  loadProduct(data) {
    if (data) {
      this.rowData = [];
      while (data.length > 0) {
        const chuck = data.splice(0, 4);
        this.rowData.push([
          chuck[0],
          chuck[1] || {},
          chuck[2] || {},
          chuck[3] || {}
        ]);
      }
    }
    this.loading = false;
  }

  onClickCate(event) {
    this.selectedCate = event.name;
    this.loading = true;
    this.woocommerceProductsService.getAllProducts(event.id).subscribe(data => {
      this.loadProduct(data);
    });
  }

  handleEvent(event) {
    if (event) {
      switch (event) {
        case 'deleted':
          this.prepareData();
          break;
        default: this.prepareData();
      }
    }
  }
}
