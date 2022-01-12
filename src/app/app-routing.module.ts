import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { AddPaymentComponent } from './admin/add-payment/add-payment.component';


const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "signin",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: 'user',
    component: DashboardComponent,
    children: [
     
    ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'members',
        component: UsersComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'add-payment',
        component: AddPaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
