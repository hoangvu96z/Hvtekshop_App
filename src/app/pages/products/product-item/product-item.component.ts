import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Product, WoocommerceProductsService } from 'src/app/services';

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
    private productService: WoocommerceProductsService
    ) { }

  ngOnInit() {

  }

  async delete(item) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert-class',
      header: 'Delete',
      subHeader: `Do you want to delete ${item.name} ?`,
      message: 'Please confirm it by press Yes button',
      buttons: [{text : 'No'}, {
        text: 'Yes',
        handler: () => {
          this.callDelete(item);
        }
      }]
    });

    await alert.present();
   }

   callDelete(item) {
     this.productService.deleteProduct(item.id).subscribe(result => {
       if (result) {
         this.presentToast();
       }
     });
   }

   async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your product deleted succefully !',
      duration: 2000
    });
    toast.present();
    this.eventProduct.emit('deleted');
  }
  
  viewMore(item) {
    this.presentToast();
  }

}
