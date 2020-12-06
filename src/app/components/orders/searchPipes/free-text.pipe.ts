import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freeTextSearch'
})

//Narrow down options according to the [vehicleNumber/orderId/employee.userName/customer.userName]
//  of the order in the OrderList
export class FreeTextPipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == null || val == '')
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].orderId.toString().indexOf(val) > -1)
          arr2.push(arr[i]);
        else if(arr[i].vehicleNumber.toString().indexOf(val.toString()) > -1)
          arr2.push(arr[i]);
        else if(arr[i].customer != null && arr[i].customer.userName.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
        else if(arr[i].employee != null && arr[i].employee.userName.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
