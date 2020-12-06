import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modelNameSearch'
})

//Narrow down vehicle types according to the modelName of the vehicle type
export class ModelNameSearch implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == null)
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].modelName.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }
}
