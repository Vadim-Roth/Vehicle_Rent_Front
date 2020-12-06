import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User, UserClass } from 'src/app/models/user.model';
import { UsersModule } from '../users.module';
import { UsersService } from 'src/app/core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  
  signUpForm: FormGroup;
  matchedPass: boolean = true;
  date17Val:Boolean = true;
  nameValidation: boolean = true;
  @Input()passwordError:string;
  @Input()dateError:string;
  @Input()userStr:string;
  newUser:User;

  @Output() saveRequested = new EventEmitter<User>();

  birthDay:any;
  today:any;
  inputs:AbstractControl[] = [];

  constructor(private formBuilder: FormBuilder, private userService:UsersService, private router:Router) { 
    this.today = new Date();
    this.signUpForm = formBuilder.group({
      'fullName': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      'userName': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      'gender': ['Else'],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required])],
      'rePassword': ['', Validators.compose([Validators.required])],
    });
    
    this.inputs[0] = this.signUpForm.controls['fullName'];
    this.inputs[1] = this.signUpForm.controls['userName'];
    this.inputs[2] = this.signUpForm.controls['gender'];
    this.inputs[3] = this.signUpForm.controls['email'];
    this.inputs[4] = this.signUpForm.controls['password'];
    this.inputs[5] = this.signUpForm.controls['rePassword'];
  }

  ngOnInit(): void {
  }
  
  public datePickerConfig = {
    disableKeypress : true
  };

  signUp(): void {
    this.newUser = new UserClass();
    if(this.birthDay != undefined && this.birthDay.isValid != undefined){
      this.newUser.userBday = this.birthDay.format("DD/MM/YYYY");
    }
    if(((this.today - this.birthDay)/(1000*60*60*24)/365.25) < 17){
      this.date17Val = false;
      return;
    }
    this.date17Val = true;

    if(this.inputs[4].value != this.inputs[5].value){
      this.matchedPass = false;
      this.passwordError = "Passwords don't match!";
    }
    else{
      this.matchedPass = true;
      if(this.inputs[4].value.length < 8){
        this.matchedPass = false;
        this.passwordError = "Passwords must be at least 8 charachters long!";
      }
    }
    if(this.matchedPass && this.date17Val){
      this.userStr = this.inputs[1].value;

      this.userService.IsUserUnique(this.userStr).subscribe(
        (response: any) => { 
          if(response == "Available") 
            this.nameValidation = false;
          else{
            this.nameValidation = true;
            this.newUser.userName = this.inputs[0].value;
            this.newUser.userNick = this.inputs[1].value;
            this.newUser.userGender = this.inputs[2].value;
            this.newUser.userEmail = this.inputs[3].value;
            this.newUser.userPass = this.inputs[4].value;
            this.newUser.userRole = "customer";
            console.log(this.newUser);
            this.userService.AddNewUser(this.newUser).subscribe();
            this.router.navigate(['/login']);
          }
        });
    }
  }
  
}

