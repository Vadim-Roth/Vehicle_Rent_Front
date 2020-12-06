import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gearSearch'
})

//Display Auto/Manual gear vehicle types
export class GearPipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == 'All')
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].gear.indexOf(val) > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
