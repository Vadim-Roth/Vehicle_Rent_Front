import { Pipe, PipeTransform } from '@angular/core';
import { BranchesService } from 'src/app/core/services/branches.service';
import { Branch } from 'src/app/models/branch.model';

@Pipe({
  name: 'branchSearch'
})

//Narrow down vehicles according to the branch location seclected from all branches available
export class BranchPipe implements PipeTransform {

  allBranches:Branch[] = [];

  constructor(private branchesService:BranchesService){
    this.branchesService.GetAllBranches().subscribe(
      branches => { this.allBranches = branches; }
    );
  }

  transform(arr: any[], val:String): Array<any> {
    if(val == 'All')
      return arr;
    let arr2 = [];
    for(let i = 0; i < arr.length; i++){
      this.branchesService.GetBranchById(arr[i].branchId).subscribe(
        branchRecived => {
          if(branchRecived.location == val)
            arr2.push(arr[i]);
        }
      );
    }
    return arr2;
  }

}
