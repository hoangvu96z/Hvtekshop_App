import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Orders', url: '/orders', icon: 'receipt' },
    { title: 'Products', url: '/products', icon: 'bag' },
    { title: 'Customers', url: '/customers', icon: 'people' },
    { title: 'Coupons', url: '/coupons', icon: 'pricetags' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
    { title: 'Reviews', url: '/reviews', icon: 'star-half' },
  ];
  public labels = [];
  constructor() {}
}
