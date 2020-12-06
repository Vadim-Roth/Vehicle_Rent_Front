import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BranchesService } from 'src/app/core/services/branches.service';
import { Branch, BranchClass } from 'src/app/models/branch.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss']
})
export class BranchesListComponent implements OnInit {

  logged:boolean = false;
  loggedUser:User;
  InputloggedUser:User;
  @Input()branches:Branch[] = [];

  editing:boolean = false;
  added:boolean = false;
  selectedBranchName:string;
  newBranchName:string = '';
  selectedBranchLocation:string;
  newBranchLocation:string = '';
  emptyVal = false;

  constructor(private branchesService:BranchesService) {
    if(localStorage.user != 'undefined'){
      this.logged = true;
      this.loggedUser = JSON.parse(localStorage.user);
    }
  }

  ngOnInit(): void {
  }

  

  addBranch(){
    this.added = true;
    this.editing = false;
    this.branches = [new BranchClass()];
  }

  cancel(){
    window.location.reload();
  }

  deleteBranch(branch:Branch){
    if(confirm('Are sure you want to delete ' + branch.branchName + '?')){
      this.branchesService.DeleteBranch(branch.branchId).subscribe();
      window.location.reload();
   }
  }

  editBranch(selectedBranch:Branch){
    this.editing = true;
    this.branches = [selectedBranch];
    this.selectedBranchName = selectedBranch.branchName;
    this.selectedBranchLocation = selectedBranch.location;
  }

  finishEdit(){
    if(this.selectedBranchName == '' || this.selectedBranchLocation == ''){
      this.emptyVal = true;
      return;
    }
    this.branches[0].branchName = this.selectedBranchName;
    this.branches[0].location = this.selectedBranchLocation;
    this.branchesService.EditBranch(this.branches[0]).subscribe();
    window.location.reload();
  }

  confirmBranch(){
    this.branches[0].branchName = this.newBranchName;
    this.branches[0].location = this.newBranchLocation;
    this.branches[0].exactLocation = '';
    if(this.newBranchName == '' || this.newBranchLocation == ''){
      this.emptyVal = true;
      return;
    }
    this.branchesService.AddNewBranch(this.branches[0]).subscribe();
    window.location.reload();
  }


}
