import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileUpdateComponent } from './components/users/profile-update/profile-update.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UsersPasswordComponent } from './components/users/users-password/users-password.component';
import { UsersProfileComponent } from './components/users/users-profile/users-profile.component';
import { AuthGuard } from "./guards/Auth/auth.guard";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'userProfile/:userProfile', component: UsersProfileComponent},
  {path: 'profile/editProfile', component: ProfileUpdateComponent, canActivate: [AuthGuard]},
  {path: 'profile/passwordProfile', component: UsersPasswordComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
