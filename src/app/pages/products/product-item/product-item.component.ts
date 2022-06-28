import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Product, WoocommerceProductsService } from 'src/app/services';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() rowData: Product[];
  @Output() eventProduct = new EventEmitter();
  constructor(public alertController: AlertController,
    private toastController: ToastController,
    private sharedService: SharedService,
    private translate: TranslateService,
    private productService: WoocommerceProductsService
    ) { }

  ngOnInit() {}

  delete(item) {
    this.sharedService.yesNoAlert(
      this.translate.instant('common.confirm'),
      `${this.translate.instant('product-page.delete-msg')}${item.name} ?`,
      () => {this.callDelete(item);},
      () => {},
      this.translate.instant('common.yes'),
      this.translate.instant('common.no'),
      'custom-alert-class',
    );
   }

   callDelete(item) {
     this.productService.deleteProduct(item.id).subscribe(result => {
       if (result) {
         this.presentToast();
       }
     });
   }

  presentToast() {
    this.sharedService.toastMessage('Your product deleted succefully !');
    this.eventProduct.emit('deleted');
  }
  
  viewMore(item) {
    this.presentToast();
  }

}
