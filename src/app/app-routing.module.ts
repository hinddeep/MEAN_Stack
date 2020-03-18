import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddFormComponent} from './add-form/add-form.component';
import {DisplayComponent} from './display/display.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'

const routes: Routes = [ 
  {path:'',redirectTo: '/login', pathMatch: 'full'},
  {path:'addForm',component:AddFormComponent},
  {path:'dashboard',component:DisplayComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
