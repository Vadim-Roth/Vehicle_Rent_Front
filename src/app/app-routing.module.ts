import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepgComponent } from './components/homepg/homepg.component';
import { OrderFinishComponent } from './components/orders/order-finish/order-finish.component';
import { OrderSummaryComponent } from './components/orders/order-summary/order-summary.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VehicleListComponent } from './components/vehicle-type/vehicle-list/vehicle-list.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { UserListComponent } from './users/user-list/user-list.component';



var loggedUser = localStorage.user;
if(loggedUser != 'undefined')
  loggedUser = JSON.parse(loggedUser);

const routes: Routes = [
  {path:"",redirectTo:"homepg",pathMatch:'full'},
  {path:"branches",loadChildren: () => import('./components/branches/branches.module').then(x => x.BranchesModule)},
  {path:"latestv",loadChildren: () => import('./components/vehicle-type/vehicle-type.module').then(x => x.VehicleTypeModule)},
  {path:"orders",loadChildren: () => import('./components/orders/orders.module').then(x => x.OrdersModule)},
  {path:"orderSum/:vehicleNumber",component:OrderSummaryComponent},
  {path:"orderFin/:orderId",component:OrderFinishComponent},
  {path:"userList",component:UserListComponent},
  {path:"login",component:LoginComponent},
  {path:"vehicles/:modelId",component:VehicleListComponent},
  {path:"homepg",component:HomepgComponent},
  {path:"sign-up", component: SignUpComponent},
  {path:"profile/:userId", component: ProfileComponent},
  {path:"profile",redirectTo:"profile/"+loggedUser.userId ,pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
