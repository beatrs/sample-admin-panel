import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserViewDetailsComponent } from './user-view-details/user-view-details.component';
import { HeaderComponent } from './header/header.component';
import { ModalConfirmComponent } from './shared/modal-confirm/modal-confirm.component';
import { UserEditPassComponent } from './user-edit-pass/user-edit-pass.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlider, MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    UserAddEditComponent,
    UserViewDetailsComponent,
    HeaderComponent,
    ModalConfirmComponent,
    UserEditPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    UserAuthModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
