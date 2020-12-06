import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userOptionSearch'
})

//Display All/Customers/Employees(including managers) users
export class UserOptionPipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == 'All')
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].userRole.indexOf(val.toLowerCase()) > -1)
          arr2.push(arr[i]);
        else if(val == 'Employee' && arr[i].userRole.indexOf('manager') > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
