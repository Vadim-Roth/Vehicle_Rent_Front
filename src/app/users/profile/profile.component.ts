import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/models/user.model';
import {Location} from '@angular/common'; 
import { OrdersService } from 'src/app/core/services/orders.service';
import { Order } from 'src/app/models/order.model';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {

  //Initiation
  private sub: any;
  userId: number;
  user:User;
  @Input()searchOptions:string = 'All';
  userOrders:Order[] = [];

  //Validation bools
  passSize:boolean = true;
  oldPassVal:boolean = true;
  emptyVal:boolean = true;
  matchVal:boolean = true;
  date17Val:Boolean = true;

  //Form variables
  clickedEdited:boolean = false;
  editForm: FormGroup;
  inputs:AbstractControl[] = [];
  birthDay:any;
  today:any;

  selectedFile: File = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private usersService:UsersService,
    private location: Location, private router: Router, private ordersService:OrdersService,
    private http: HttpClient) {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId']; // (+) converts string 'id' to a number\
      if(localStorage.user == 'undefined'|| Number(JSON.parse(localStorage.user).userId != this.userId))
        this.router.navigate(['homepg']);
   });
  }
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnChanges(): void {
  }

  refresh(){
    this.usersService.GetUserById(this.userId).subscribe(async loggedUser => {
      this.user = loggedUser;
      await this.delay(500);
      this.ordersService.GetAllUserOrders(this.userId).subscribe(
        orders => { this.userOrders = orders; });
    });
  }

  vehicleDesc(modelId: number){
    this.router.navigate(['/vehicles', modelId]);
  }

  ngOnInit(): void {
    this.location.replaceState("/profile");
    this.refresh();
  }

  activateBools(){
    this.emptyVal = true;
    this.oldPassVal = true;
    this.passSize = true;
    this.matchVal = true;
    this.oldPassVal = true;
    this.date17Val = true;
  }

  public datePickerConfig = {
    disableKeypress : true,
  };

  cancel(){
    this.clickedEdited = false;
    this.birthDay = moment(new Date(moment(this.user.userBday, "DD/MM/YYYY").format()));
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  edit(){
    this.clickedEdited = true;
    this.activateBools();
    this.editForm = this.formBuilder.group({
      'fullName': [this.user.userName, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      'gender': [this.user.userGender],
      'oldPass': [''],
      'newPass': [''],
      'conPass': ['']
    });
    this.birthDay = moment(new Date(moment(this.user.userBday, "DD/MM/YYYY").format()));
  }

  validateEdit() : boolean{
    this.today = new Date();
    this.inputs[0] = this.editForm.controls['fullName'];
    this.inputs[1] = this.editForm.controls['gender'];
    if(this.birthDay != undefined && this.birthDay.isValid != undefined){
      if(((this.today - this.birthDay)/(1000*60*60*24)/365.25) < 17){
        this.date17Val = false;
        return false;
      }
    }
    this.inputs[2] = this.editForm.controls['oldPass'];
    if(this.inputs[2].value != ''){
      this.emptyVal = false;
      if(this.inputs[2].value != this.user.userPass){
        this.oldPassVal = false;
        return false;
      }
    }
    if(!this.emptyVal){
      this.inputs[3] = this.editForm.controls['newPass'];
      this.inputs[4] = this.editForm.controls['conPass'];
      if(this.inputs[3].value.length < 8 || this.inputs[4].value.length < 8 ){
        this.passSize = false;
        return false;
      }

      if(this.inputs[3].value != this.inputs[4].value){
        this.matchVal = false;
        return false;
      }
    }
    return true;
  }

  save(){
    this.activateBools();
    if(this.validateEdit()){
      this.user.userName = this.inputs[0].value;
      this.user.userGender = this.inputs[1].value;
      if(this.birthDay != null)
        this.user.userBday = this.birthDay.format("DD/MM/YYYY");
      if(!this.emptyVal)
        this.user.userPass = this.inputs[4].value;
      /*
      if(this.selectedFile != null){
        //this.user.userPicture = this.selectedFile.name;
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.http.post('http://localhost:64335/Users/UploadImage', this.selectedFile, {
          reportProgress: true,
          observe: 'events'
        })
          .subscribe(event => {
            console.log(event); // handle event here
          });
      }
      */
      this.clickedEdited = false;
      this.usersService.EditUser(this.user).subscribe();
    }
  }
}