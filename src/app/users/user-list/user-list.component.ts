import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()userList:User[] = [];
  editList:User[] = [];
  searchOptions:string = "All";
  freeText:string;

  manager:User;

  editForm: FormGroup;
  editing:boolean = false;
  emptyVal:boolean = true;
  
  inputs:AbstractControl[] = [];

  constructor(private router:Router, private usersService:UsersService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    if(localStorage.user == 'undefined'|| JSON.parse(localStorage.user).userRole != 'manager')
      this.router.navigate(['homepg']);
    else{
      this.manager = JSON.parse(localStorage.user);
      this.refresh();
    }
  }

  editUser(user:User){
    this.editList[0] = user;
    this.userList = this.editList;
    this.editing = true;
    this.editForm = this.formBuilder.group({
      'userName': [user.userName, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      'userNick': [user.userNick, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      'userGender': [user.userGender],
      'userEmail': [user.userEmail,  Validators.compose([Validators.required, Validators.email])],
      'userPass': [user.userPass, Validators.compose([Validators.required])],
      'userRole': [user.userRole]
    });
    this.inputs[0] = this.editForm.controls['userName'];
    this.inputs[1] = this.editForm.controls['userNick'];
    this.inputs[2] = this.editForm.controls['userGender'];
    this.inputs[3] = this.editForm.controls['userEmail'];
    this.inputs[4] = this.editForm.controls['userPass'];
    this.inputs[5] = this.editForm.controls['userRole'];
  }

  cancel(){
    this.editing = false;
    this.refresh();
  }

  finishEdit(){
    this.editList[0].userName = this.inputs[0].value;
    this.editList[0].userNick = this.inputs[1].value;
    this.editList[0].userGender = this.inputs[2].value;
    this.editList[0].userEmail = this.inputs[3].value;
    this.editList[0].userPass = this.inputs[4].value;
    this.editList[0].userRole = this.inputs[5].value;
    this.usersService.EditUser(this.editList[0]).subscribe();
    this.editing = false;
    window.location.reload();
  }

  deleteUser(user:User){
    if(confirm('Are sure you want to delete ' + user.userNick + '?')){
      this.usersService.DeleteUser(user.userId).subscribe();
      window.location.reload();
   }
}

  refresh(){
    this.usersService.GetAllUsers().subscribe(
      list => { this.userList = list; }
    );
  }

}
