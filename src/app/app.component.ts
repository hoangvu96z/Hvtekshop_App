import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
  constructor(public loadingController: LoadingController) {}
  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}
