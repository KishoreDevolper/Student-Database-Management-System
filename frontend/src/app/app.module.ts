import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { HttpClientModule } from '@angular/common/http'
import { ApiserviceService } from './apiservice.service';
import { AuthGuardService } from './auth.guard.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { MarkComponent } from './mark/mark.component';
import { MarkyComponent } from './marky/marky.component';
import { DisplayComponent } from './display/display.component';
import { StaffcreationComponent } from './staffcreation/staffcreation.component';
import { HomeComponent } from './home/home.component';
import { LoginsComponent } from './logins/logins.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthentcationService } from './authentication.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    ViewComponent,
    LoginComponent,
    StudentComponent,
    LoginsComponent,
    MarkComponent,
    MarkyComponent,
    DisplayComponent,
    StaffcreationComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ApiserviceService,AuthentcationService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
