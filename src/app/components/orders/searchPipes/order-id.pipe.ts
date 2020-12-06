import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderIdSearch'
})

//Narrow down options according to the orderId of the order in the OrderList
export class OrderIdPipe implements PipeTransform {

  transform(arr: any[], val:number): Array<any> {
    if(val == null)
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].orderId.toString().indexOf(val) > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
