import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleNumberSerach'
})

//Narrow down options according to the vehicleNumber of the vehicle
export class VehicleNumberPipe implements PipeTransform {

  transform(arr: any[], val:number): Array<any> {
    if(val == null)
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].vehicleNumber.toString().indexOf(val.toString()) > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
