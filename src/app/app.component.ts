import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges{

  loggedUser:User;
  title = 'Red Wheels';
  btnText:string;
  logged:boolean = false;
  searchedVehicles = true;

  async logOut(){
    localStorage.user = undefined;
    localStorage.userId = undefined;
    this.router.navigate(['homepg'])
    .then(() => {
      window.location.reload();
    });
  }
  
  constructor(private router: Router){}

  ngOnChanges() {
  }

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    if(localStorage.user == 'undefined'){
      this.logged = false;
    }
    else{
      this.logged = true;
      this.loggedUser = JSON.parse(localStorage.user);
    }
  }
}
