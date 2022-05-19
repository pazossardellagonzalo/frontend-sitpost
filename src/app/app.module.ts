import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UsersProfileComponent } from './components/users/users-profile/users-profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileUpdateComponent } from './components/users/profile-update/profile-update.component';
import { UsersPasswordComponent } from './components/users/users-password/users-password.component';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    ProfileComponent,
    NavbarComponent,
    CreatePostComponent,
    FilterPipe,
    UsersProfileComponent,
    ProfileUpdateComponent,
    UsersPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    Ng2SearchPipeModule,
    MatPaginatorModule,
    MatTabsModule,
    MatInputModule,
    NgbModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
