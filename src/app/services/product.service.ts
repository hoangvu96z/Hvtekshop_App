import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, flatMap, map } from 'rxjs/operators';
import { WoocommerceProductsService } from './products/woocommerce-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient;
  private wooHelper;
  constructor(
    private http: HttpClient,
    ) {
  }


}
