import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services';
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
  public labels = ['Login', 'Sign Out', 'Account'];
  constructor(public loadingController: LoadingController,
    platform: Platform,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {
    platform.ready().then(() => {
      this.initializeApp();
    });
  }

  initializeApp() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  action(act) {
    switch (act) {
      case 'Sign Out':
        this.signOut();
        break;
    }
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }

}
