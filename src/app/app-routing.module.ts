import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { AdminComponent } from './views/admin/admin.component';
import { ClientsComponent } from './views/clients/clients.component';
import { LoansComponent } from './views/loans/loans.component';
import { LoginComponent } from './views/login/login.component';
import { NewComponent } from './views/new/new.component';

const routes: Routes = [
  {path:'', component: AdminComponent},
  {path:'clients', component: ClientsComponent},
  {path:'loans', component: LoansComponent},
  {path:'login', component: LoginComponent},
  {path:'new', component: NewComponent},
  {path: 'about', component: AboutComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
