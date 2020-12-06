import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orderList/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleNumberPipe } from './searchPipes/vehicle-number.pipe';
import { CustomerPipe } from './searchPipes/customer.pipe';
import { OrderIdPipe } from './searchPipes/order-id.pipe';
import { FreeTextPipe } from './searchPipes/free-text.pipe';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { RouterModule } from '@angular/router';
import { OrderFinishComponent } from './order-finish/order-finish.component';
import { OptionsPipe } from './searchPipes/options.pipe';
import { DpDatePickerModule } from 'ng2-date-picker';




@NgModule({
  declarations: [OrdersComponent, VehicleNumberPipe, CustomerPipe, OrderIdPipe, FreeTextPipe, OrderSummaryComponent,
     OrderFinishComponent, OptionsPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule ,
    RouterModule.forChild([{
      path: '', component: OrdersComponent
    }])
  ]
})
export class OrdersModule { }
