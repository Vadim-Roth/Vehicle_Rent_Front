import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/models/user.model';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  user:User;
  userId:number;
  nameValidation: boolean = true;
  passValidation: boolean = true;
  logInfo:string;
  @Input()userStr:string;

  loginForm: FormGroup;
  inputs:AbstractControl[] = [];

  signUp(){
    this.router.navigate(['sign-up']);
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private userService:UsersService) {
    if(localStorage.user != 'undefined')
      this.router.navigate(['/profile', Number(JSON.parse(localStorage.user).userId)]);
    this.loginForm = formBuilder.group({
      'userName': ['', Validators.compose([Validators.required])], //PeepPeep
      'password': ['', Validators.compose([Validators.required])] //CoolCats
    });
    this.inputs[0] = this.loginForm.controls['userName'];
    this.inputs[1] = this.loginForm.controls['password'];
   }

  login(): void{
    this.userStr = this.inputs[0].value;
    this.userService.IsUserUnique(this.userStr).subscribe(
      (response: any) => { 
        if(response != "Available") 
          this.nameValidation = false;
        else{
          this.nameValidation = true;
          this.logInfo = this.userStr + '^' + this.inputs[1].value;
          this.userService.Login(this.logInfo).subscribe((loggedUser: any) => {
              if(loggedUser != null){
                this.passValidation = true;
                this.user = loggedUser;
                this.log();
              }
              else
                this.passValidation = false;
            }
          );
        }
      });

  }

  log(){
    localStorage.user = JSON.stringify(this.user);
    window.location.reload();
    
  }

  ngOnInit(): void {
    
  }

}
