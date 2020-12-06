import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerSearch'
})

//Narrow down options according to the userName of the customer in the OrderList
export class CustomerPipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == null || val == '')
      return arr;
    let arr2 = [];
    for(let i = 0; i < arr.length; i++){
      if(arr[i].customer != null && arr[i].customer.userName.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
    }
    return arr2;
  }

}
