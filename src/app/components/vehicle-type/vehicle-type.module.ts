import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeHomeComponent } from './vehicle-type-home/vehicle-type-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ModelNameSearch } from './serachPipes/modelName.pipe';
import { GearPipe } from './serachPipes/gear.pipe';
import { MinYearPipe } from './serachPipes/min-year.pipe';
import { MaxYearPipe } from './serachPipes/max-year.pipe';
import { FreeTextPipe } from './serachPipes/free-text.pipe';
import { MinCostPipe } from './serachPipes/min-cost.pipe';
import { MaxCostPipe } from './serachPipes/max-cost.pipe';
import { VehicleNumberPipe } from './serachPipes/vehicle-number.pipe';
import { AvailabilityPipe } from './serachPipes/availability.pipe';
import { BranchPipe } from './serachPipes/branch.pipe';



@NgModule({
  declarations: [VehicleTypeListComponent, VehicleTypeHomeComponent, VehicleListComponent, ModelNameSearch,
     GearPipe, MinYearPipe, MaxYearPipe, FreeTextPipe, MinCostPipe, MaxCostPipe, VehicleNumberPipe, AvailabilityPipe,
      BranchPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '', component: VehicleTypeHomeComponent
    }])
  ]
})
export class VehicleTypeModule { }
