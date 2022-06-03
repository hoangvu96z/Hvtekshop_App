import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { IonicModule } from '@ionic/angular';
import { SharedService } from './shared.service';
import { NodataComponent } from './nodata/nodata.component';



@NgModule({
  declarations: [LoadingComponent, NodataComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [SharedService],
  exports: [LoadingComponent, NodataComponent]
})
export class SharedModule { }
