import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freeTextUserSearch'
})

//Narrow down users according to the [userName/userNick/userEmail/userId] of the user
export class FreeTextPipe implements PipeTransform {

  transform(arr: any[], val:String): Array<any> {
    if(val == null)
      return arr;
    let arr2 = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].userName.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
        else if(arr[i].userNick.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
        else if(arr[i].userEmail.toUpperCase().indexOf(val.toUpperCase()) > -1)
          arr2.push(arr[i]);
        else if(arr[i].userId.toString().indexOf(val.toString()) > -1)
          arr2.push(arr[i]);
      }
      if(arr2.length)
        return arr2;
      return null;
  }

}
