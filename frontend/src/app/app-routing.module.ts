import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { MarkComponent } from './mark/mark.component';
import { MarkyComponent } from './marky/marky.component';
import { ReadComponent } from './read/read.component';
import { StudentComponent } from './student/student.component';
import { DisplayComponent } from './display/display.component';
import { LoginsComponent } from './logins/logins.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewComponent } from './view/view.component';
import { AuthGuardService } from './auth.guard.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { StaffcreationComponent } from './staffcreation/staffcreation.component';
const routes: Routes = [
  {path:'create',component:CreateComponent},
  {path:'create/:id',component:CreateComponent},
  {path:'read',component:ReadComponent},
  {path:'read/:id',component:ReadComponent},
  {path:'view',component:ViewComponent},
  {path:'view/:id',component:ViewComponent},
   {path:'login',component:LoginComponent},
   {path:'student/:id',component:StudentComponent},
   {path:'student',component:StudentComponent},
   {path:'mark',component:MarkComponent},
   {path:'mark/:id',component:MarkComponent},
   {path:'marky/:id',component:MarkyComponent},
   {path:'display',component:DisplayComponent},
   {path:'staffcreation',component:StaffcreationComponent},
   {path:'',component:HomeComponent},
   {path:'logins',component:LoginsComponent},
   {path:'register',component:RegisterComponent},
   {
     path:'profile',component:ProfileComponent,
     canActivate:[AuthGuardService]
   }
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
