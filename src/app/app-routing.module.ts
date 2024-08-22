import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewscontactComponent } from './viewscontact/viewscontact.component';
import { AddEditComponent } from './add-edit/add-edit.component';
const routes: Routes = [
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: ViewscontactComponent },
  { path: 'View', component: ViewscontactComponent},
  { path: 'add', component: AddEditComponent},
  { path: 'edit/:id', component: AddEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
