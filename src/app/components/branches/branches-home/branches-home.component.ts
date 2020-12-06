import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../../core/services/branches.service';
import { Branch } from 'src/app/models/branch.model';

@Component({
  selector: 'app-branches-home',
  templateUrl: './branches-home.component.html',
  styleUrls: ['./branches-home.component.scss']
})
export class BranchesHomeComponent implements OnInit {

  branches: Branch[] = [];

  constructor(private branchesService: BranchesService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.branchesService.GetAllBranches().subscribe(list => {this.branches = list});
  }

}
