import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserOptionPipe } from './searchPipes/user-option.pipe';
import { FreeTextPipe } from './searchPipes/free-text.pipe';
import { OrderTypePipe } from './searchPipes/order-type.pipe';
import { DpDatePickerModule } from 'ng2-date-picker';



@NgModule({
  declarations: [LoginComponent, SignUpComponent, ProfileComponent, UserListComponent, UserOptionPipe, FreeTextPipe,
    OrderTypePipe, OrderTypePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule ,
    RouterModule.forChild([{
      path: '', component: LoginComponent,
    }])
  ]
})
export class UsersModule { }
