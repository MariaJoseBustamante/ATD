import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FotoPage } from './foto.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


import { FotoPageRoutingModule } from './foto-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FotoPageRoutingModule
  ],
  declarations: [FotoPage],
  providers: []
})
export class FotoPageModule {}
