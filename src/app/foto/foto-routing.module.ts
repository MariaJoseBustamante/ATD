import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotoPage } from './foto.page';
import { TongueService } from '../services/tongue.service';

const routes: Routes = [
  {
    path: '',
    component: FotoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[TongueService]
})
export class FotoPageRoutingModule {}
