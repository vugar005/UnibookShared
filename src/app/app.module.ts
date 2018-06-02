import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {SharedService} from './shared.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {AuthService} from './auth/auth.service';
import {AppRoutingModule} from './app-routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SnotifyModule,
    AppRoutingModule
  ],
  providers: [
    SharedService,
    AuthService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
