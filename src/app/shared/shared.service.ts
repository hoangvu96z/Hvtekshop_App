/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable, Injector } from '@angular/core';
import { AlertController, AlertOptions, ToastController, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { PredefinedColors } from '../const/shared.enum';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _translate: TranslateService;
  private lastAlert: HTMLIonAlertElement = null;


  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private injector: Injector,
  ) {
  }

  get translate(): TranslateService {
    if(!this._translate) {
        this._translate = this.injector.get(TranslateService);
    }
    return this._translate;
  }

  toastMessage(_message: string, _color : PredefinedColors = 'primary', _duration = 2000) : Promise<any> {
    if (_.isNil(_message) || _.isEmpty(_message)) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const opts : ToastOptions = {
          message: _message,
          buttons: [
            {
              role: 'cancel',
              handler: () => {}
            }
          ],
          duration: _duration,
          color: _color
        };
        this.createToast(opts).then(toast => {
          toast.present();
          toast.onDidDismiss().then(() => {
          });
        });
      });
  }

  warningAlert(message: string, okFunction?: any, okText?: string, _cssClass?: string) : Promise<any> {
    return new Promise(async (resolve, reject) => {
      const options : AlertOptions = {
        header: this.translate.instant('common.warning'),
        subHeader: message,
        backdropDismiss: false,
        cssClass : _cssClass,
        buttons: [
          {
            text: okText || this.translate.instant('common.ok'),
            role: 'cancel',
            handler: okFunction || {},
          }
        ]
      };
      (await this.createAlert(options)).present();
    });
  }

  yesNoAlert(title: string, message: string, yesFunction: any, noFunction?: any, yesText?: string, noText?: string, _cssClass?: string) : Promise<any> {
    return new Promise(async (resolve, reject) => {
      const options : AlertOptions = {
        header: title,
        subHeader: message,
        backdropDismiss: false,
        cssClass : _cssClass,
        buttons: [
          {
            text: noText || this.translate.instant('common.no'),
            role: 'cancel',
            handler: noFunction || {},
          },
          {
            text: yesText || this.translate.instant('common.yes'),
            handler: yesFunction
          }
        ]
      };
      (await this.createAlert(options)).present();
    });
  }

  // Common functions
  createAlert(opts: AlertOptions): Promise<HTMLIonAlertElement> {
    if (!_.isNil(opts)) {
      // TODO [Components] need to fix after moving components
      const alert =  this.alertCtrl.create(opts).then(e=>this.lastAlert = e);
      return alert;
    }
  }


  createToast(opts: ToastOptions): Promise<HTMLIonToastElement> {
    if (!_.isNil(opts)) {
      return this.toastCtrl.create(opts);
    }
  }
}
