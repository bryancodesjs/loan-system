import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'

//FIREBASE MODULES
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { AdminComponent } from './views/admin/admin.component';
import { NewComponent } from './views/new/new.component';
import { ClientsComponent } from './views/clients/clients.component';
import { LoansComponent } from './views/loans/loans.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { environment } from 'src/environments/environment';
import { ActiveComponent } from './views/loans/active/active.component';
import { PaidComponent } from './views/loans/paid/paid.component';
import { AllComponent } from './views/loans/all/all.component';
import { PendingComponent } from './views/loans/pending/pending.component';

//ng bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//print module
import { NgxPrintElementModule } from 'ngx-print-element';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NewComponent,
    ClientsComponent,
    LoansComponent,
    NavbarComponent,
    FooterComponent,
    ActiveComponent,
    PaidComponent,
    AllComponent,
    PendingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    NgxPrintElementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }