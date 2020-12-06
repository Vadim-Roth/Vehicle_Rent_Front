import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availabilitySearch'
})

//Display Available/Unavailable vehicles
export class AvailabilityPipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == 'All')
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(val == 'Available'){
          if(arr[i].isAvailable && arr[i].isFunctional)
            arr2.push(arr[i]);
        }
        else{
          if(!arr[i].isAvailable || !arr[i].isFunctional)
            arr2.push(arr[i]);
        }
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
