import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewscontactComponent } from './viewscontact/viewscontact.component';
const routes: Routes = [
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: ViewscontactComponent },
  { path: 'View', component: ViewscontactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
