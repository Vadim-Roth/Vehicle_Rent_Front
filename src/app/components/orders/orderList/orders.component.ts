import { SyncAsync } from '@angular/compiler/src/util';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { OrdersService } from 'src/app/core/services/orders.service';
import { UsersService } from 'src/app/core/services/users.service';
import { VehiclesService } from 'src/app/core/services/vehicles.service';
import { Order } from 'src/app/models/order.model';
import { User, UserClass } from 'src/app/models/user.model';
import { UserListComponent } from 'src/app/users/user-list/user-list.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  //Initiation
  logged:boolean = false;
  loggedUser:User;
  @Input() orderList: Order[] = [];
  
  //Search variables
  @Input()searchOptions:string = 'All';
  @Input()orderId:number;
  @Input()vehicleNumber:number;
  @Input()customerName:string;
  @Input()freeText:string;

  //Edit form variables
  editing:boolean = false;
  originalCustId:number;
  orderForm: FormGroup;
  inputs:AbstractControl[] = [];
  vehicleNumbers: number[] = [];
  customerIds:number[] = [];
  employees:User[] = [];
  firstDay:any;
  lastDay:any;
  realLastDay:any;

  //Boolean variables
  subZeroVal:boolean = false;
  vehicleDoesntExistVal:boolean = false;
  userDoesntExistVal:boolean = false;
  compareVal:boolean = true;
  editEmp:boolean = false;

  constructor(private ordersService: OrdersService, private usersService: UsersService, private router: Router,
    private formBuilder:FormBuilder, private vehiclesService:VehiclesService) {
      this.orderForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    if(localStorage.user == 'undefined' || JSON.parse(localStorage.user).userRole == 'customer')
      this.router.navigate(['homepg']);
    else{
      this.logged = true;
      this.loggedUser = JSON.parse(localStorage.user);
      this.refresh();
    }
  }

  vehicleDesc(modelId: number){
    this.router.navigate(['/vehicles', modelId]);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async refresh(){
    await this.delay(500);
    this.ordersService.GetAllOrders().subscribe(
      list => { this.orderList = list; });
  }

  editOrder(selectedOrder:Order){
    this.editing = true;
    this.orderList = [selectedOrder];
    this.originalCustId = this.orderList[0].custId;
    this.vehiclesService.GetAllVehicles().subscribe(
      allVehicles => { 
        for(let i of allVehicles)
          this.vehicleNumbers.push(i.vehicleNumber);
      }
    );
    this.usersService.GetAllUsers().subscribe(
      allUsers => {
        for(let i of allUsers)
          this.customerIds.push(i.userId);
      }
    );
    this.initForm();
  }

  initForm(){
    this.activateBools();
    this.firstDay = moment(new Date(moment(this.orderList[0].orderStart, "DD/MM/YYYY").format()));
    this.lastDay = moment(new Date(moment(this.orderList[0].orderEnd, "DD/MM/YYYY").format()));
    if(this.orderList[0].orderRealEnd != undefined)
      this.realLastDay = moment(new Date(moment(this.orderList[0].orderRealEnd, "DD/MM/YYYY").format()));
    this.orderForm = this.formBuilder.group({
      'vehicleNumber': [this.orderList[0].vehicleNumber, Validators.compose([Validators.required])],
      'customerId': [this.orderList[0].custId],
      'empRegister': [this.employees[0]],
    });
    this.inputs[0] = this.orderForm.controls['vehicleNumber'];
    this.inputs[1] = this.orderForm.controls['customerId'];
    this.inputs[2] = this.orderForm.controls['empRegister'];
  }
  
  activateBools(){
    this.compareVal = true;
    this.subZeroVal = false;
    this.vehicleDoesntExistVal = false;
    this.userDoesntExistVal = false;
  }

  public datePickerConfig = {
    disableKeypress : true,
  };

  cancel(){
    window.location.reload();
  }
  

  finishEdit(){
    this.activateBools();
    if(this.finishAndValidate()){
        this.orderList[0].vehicleNumber = this.inputs[0].value;
        if(this.inputs[1].value != null)
          this.orderList[0].custId = this.inputs[1].value;
        else
          this.orderList[0].custId = 0;
        if(this.editEmp){
          if(this.inputs[2].value == null || this.inputs[2].value == "")
            this.orderList[0].empRegister = 0;
          else{
            for(let i of this.employees){
              if(i.userNick == this.inputs[2].value){
                this.orderList[0].empRegister = i.userId;
                break;
              }
            }
          }
        }
        this.orderList[0].orderStart = this.firstDay.format("DD/MM/YYYY").toString();
        this.orderList[0].orderEnd = this.lastDay.format("DD/MM/YYYY").toString();
        if(this.realLastDay != undefined)
          this.orderList[0].orderRealEnd = this.realLastDay.format("DD/MM/YYYY").toString();
        else
          this.orderList[0].orderRealEnd = null;
        this.ordersService.EditOrder(this.orderList[0]).subscribe();
        window.location.reload();
    }
  }

  finishAndValidate() : boolean{
    if(this.lastDay < this.firstDay){
      this.compareVal = false;
      return false;
    }
    if(this.inputs[0].value < 0 || this.inputs[0].value == null){
      this.subZeroVal = true;
      return false;
    }
    if(this.inputs[0].value > 0){
      let vehicleFound = false;
      for(let i of this.vehicleNumbers){
        if(i == this.inputs[0].value){
          vehicleFound = true;
          break;
        }
      }
      if(!vehicleFound){
        this.vehicleDoesntExistVal = true;
        return false;
      }
    }
    if(this.inputs[1].value != null && this.inputs[1].value != 0){
      let customerFound = false;
      for(let i of this.customerIds){
        if(i == this.inputs[1].value){
          customerFound = true;
          break;
        }
      }
      if(!customerFound){
        this.userDoesntExistVal = true;
        return false;
      }
    }
    return true;
  }

  deleteOrder(order:Order){
    var question = 'Are sure you want to delete order ' + order.orderId;
    if(order.vehicleNumber > 0 && order.empRegister <= 0)
      question += ' and make vehicle ' + order.vehicleNumber + ' available?';
    else
      question +='?';
    if(confirm(question)){
      this.ordersService.DeleteOrder(order.orderId).subscribe();
      window.location.reload();
    }
  }

  editEmployee(){
    this.editEmp = true;
    this.usersService.GetAllUsers().subscribe(
      usersRecived =>{
        this.employees.push(new UserClass());
        for(let i = 0; i < usersRecived.length; i++){
          if(usersRecived[i].userRole == "employee" || usersRecived[i].userRole == "manager")
            this.employees.push(usersRecived[i]);
        }
      });
  }

  openOrder(){
    this.realLastDay = undefined;
  }
}
