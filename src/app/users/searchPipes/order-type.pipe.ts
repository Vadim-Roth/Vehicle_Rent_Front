import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderTypeSearch'
})

//Display All/Open/Closed orders of OrderList of vehicles in the profile
export class OrderTypePipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == 'All')
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(val == 'Open'){
          if(arr[i].orderRealEnd == '' || arr[i].orderRealEnd == null)
            arr2.push(arr[i]);
        }
        else
          if(arr[i].orderRealEnd as number)
        arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }
}
