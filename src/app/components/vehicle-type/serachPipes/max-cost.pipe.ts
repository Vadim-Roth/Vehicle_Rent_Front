import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxCostSearch'
})

//Narrow down vehicle types that cost less or the same as the amount typed
export class MaxCostPipe implements PipeTransform {

  transform(arr: any[], val:number): Array<any> {
    let arr2 = [];
    if(arr == null)
      return null;
    for(let i = 0; i < arr.length; i++){
      if(arr[i].dailyCost <= val)
        arr2.push(arr[i]);
    }
    if(arr2.length)
      return arr2;
    return null;
  }

}
