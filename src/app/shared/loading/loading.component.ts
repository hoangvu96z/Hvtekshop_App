import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoadingController } from '@ionic/angular';

/**
 * Displays an animated loading spinner and message, centered within the containing element.
 * The spinner is shown 25% vertically offset within the containing element for tablet size devices
 * and centered for phone size devices.
 * This component should be toggled visible/hidden as required using the *ngIf directive.
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnChanges {
  /** The message to display under the loading spinner - this may be a translation key. */
  @Input() text = 'Loading';
  @Input() loading: boolean;
  loadControl: any;
  constructor(public loadingController: LoadingController) {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.loading) {
        if (this.loading) {
          this.presentLoading();
        } else {
          if (this.loadControl) {
            this.dismiss();
            this.loadControl = undefined;
          }
        }
      }
  }
  async presentLoading() {
    this.loadControl = await this.loadingController.create({
      cssClass: 'loading-custom-class',
      message: this.text,
    });
    this.loadControl.present();
  }

  async dismiss() {
    return await this.loadControl.dismiss().then(() => {});
  }
}
