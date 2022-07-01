/* eslint-disable quote-props */
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/services';
import { ProductService } from 'src/app/services/product.service';
import { WoocommerceProductsService } from 'src/app/services/products/woocommerce-products.service';
import { WordpressService } from 'src/app/services/wordpress.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements AfterViewInit, OnDestroy{
  data: Product[];
  rowData: any[] = [];
  loading = false;
  categories: any[];
  selectedCate  = 'All products';
  numberOfItemInTheRow = 4;
  constructor(public productService: ProductService,
    private woocommerceProductsService: WoocommerceProductsService,
    private wordpressService: WordpressService,
    private httpClient: HttpClient
  ) { }

  ngAfterViewInit(): void {
    this.loading = false;
    this.prepareData();
  }


  prepareData() {
    this.loading  = true;
    forkJoin(this.woocommerceProductsService.getAllProducts(),
      this.woocommerceProductsService.listAllCategories()
    ).subscribe(data => {
        this.loading = false;
      if (data) {
        const [allProducts, categories] = data;
        this.categories = categories;
        this.loadProduct(allProducts);
      }
    }, err => {
      this.loading = false;
    });
  }

  loadProduct(data) {
    this.loading = false;
    if (data) {
      this.rowData = [];
      while (data.length > 0) {
        const chuck = data.splice(0, this.numberOfItemInTheRow);
        const item = [];
        for (let i = 0; i < this.numberOfItemInTheRow; i++) {
          item.push(chuck[i] || {});
        };
        this.rowData.push(item);
      }
    }
  }

  ngOnDestroy(): void {
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
