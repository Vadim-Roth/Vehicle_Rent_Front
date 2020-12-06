import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freeTextSearch'
})

//Narrow down vehicle types according to the [modelName/manufacturer/gear] of the vehicle type
export class FreeTextPipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == null)
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].modelName.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
        else if(arr[i].manufacturer.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
        else if(arr[i].gear.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
