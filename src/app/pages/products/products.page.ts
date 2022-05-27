/* eslint-disable quote-props */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(public productService: ProductService,
    private woocommerceProductsService: WoocommerceProductsService,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.prepareData();
  }

  prepareData() {
    this.woocommerceProductsService.getAllProducts().subscribe(result => {
      if (result) {
        this.data = result;
        while( result.length > 0) {
          const chuck = result.splice(0, 3);
          this.rowData.push([
          chuck[0],
          chuck[1] || {},
          chuck[2] || {}
          ]);
        }
      }
    });
  }
}
