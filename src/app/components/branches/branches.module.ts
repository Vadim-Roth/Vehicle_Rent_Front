import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesHomeComponent } from './branches-home/branches-home.component';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BranchesHomeComponent, BranchesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '', component: BranchesHomeComponent
    }])
  ]
})
export class BranchesModule { }
