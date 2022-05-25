import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Orders', url: '/folder/orders', icon: 'receipt' },
    { title: 'Products', url: '/folder/products', icon: 'bag' },
    { title: 'Customers', url: '/folder/customers', icon: 'people' },
    { title: 'Coupons', url: '/folder/coupons', icon: 'pricetags' },
    { title: 'Settings', url: '/folder/settings', icon: 'settings' },
    { title: 'Reviews', url: '/folder/reviews', icon: 'star-half' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
