import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotoPage } from './foto.page';

const routes: Routes = [
  {
    path: '',
    component: FotoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotoPageRoutingModule {}
