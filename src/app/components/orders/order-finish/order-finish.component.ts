import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import {Location} from '@angular/common'; 
import { OrdersService } from 'src/app/core/services/orders.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { VehiclesService } from 'src/app/core/services/vehicles.service';
import { VehicleTypesService } from 'src/app/core/services/vehicle-types.service';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-order-finish',
  templateUrl: './order-finish.component.html',
  styleUrls: ['./order-finish.component.scss']
})
export class OrderFinishComponent implements OnInit {
  
  sub:any;
  order:Order;
  orderId: number;
  today:any = new Date();
  user: User;
  daysUsed:number = 0;
  daysUsedExtra:number = 0;
  customer: User;
  vehicleSelected:Vehicle;
  vehicleTypeSelected:VehicleType;
  newSpeed:Number; speedValidation:boolean = true;

  fairUse:number = 0; extraUse:number = 0; totalSum:number = 0;
  startDate: any; endDate: any; realEnd: any; 

  constructor(private router: Router, private route: ActivatedRoute, private location: Location,
    private ordersService:OrdersService, private usersService:UsersService, private vehiclesService:VehiclesService,
      private vehicleTypesService:VehicleTypesService, private datePipe: DatePipe) {
      if(localStorage.user == 'undefined')
        this.router.navigate(['homepg']);
      else
        this.user = JSON.parse(localStorage.user);
    this.sub = this.route.params.subscribe(params => {
      this.orderId = +params['orderId'];
      this.location.replaceState("/orderFin");
      this.ordersService.GetOrderById(this.orderId).subscribe(
        orderRecived => {
          this.order = orderRecived;
          this.vehiclesService.GetVehicleByVehicleNumber(this.order.vehicleNumber).subscribe(
            vehicleRecived => {
              this.vehicleSelected = vehicleRecived;
              this.newSpeed = this.vehicleSelected.currentKilos;
              this.vehicleTypesService.GetVehicleType(this.vehicleSelected.modelId).subscribe(
                vehicleTypeRecived => {
                  this.vehicleTypeSelected = vehicleTypeRecived;
    
                  this.startDate = new Date(moment(this.order.orderStart, "DD/MM/YYYY").format());
                  this.endDate = new Date(moment(this.order.orderEnd, "DD/MM/YYYY").format());
                  this.realEnd = new Date();
                  this.today = new Date();
                  if(this.realEnd < this.startDate){
                    this.daysUsed = 0;
                    this.daysUsedExtra = 0;
                  }
                  else if(this.realEnd <= this.endDate){
                    this.daysUsed = Math.floor((this.realEnd - this.startDate)/(1000*60*60*24)) + 1;
                    this.daysUsedExtra = 0;
                  }
                  else{
                    this.daysUsed = Math.floor((this.endDate - this.startDate)/(1000*60*60*24)) + 1;
                    this.daysUsedExtra = Math.floor((this.realEnd - this.endDate)/(1000*60*60*24));
                  }
                  this.fairUse = this.daysUsed * this.vehicleTypeSelected.dailyCost;
                  this.extraUse = this.daysUsedExtra * this.vehicleTypeSelected.dailyDelay;
                  this.totalSum = this.fairUse + this.extraUse;
                }
              );}
          );
          this.usersService.GetUserById(Number(this.order.custId)).subscribe(
            customerRecieved => {
              this.customer = customerRecieved;
            }
          );
        }
      );
      this.refresh();
   });
  }
  submit(){
    if(this.newSpeed < this.vehicleSelected.currentKilos){
      this.speedValidation = false;
      return;
    }
    this.speedValidation = true;
    this.vehicleSelected.currentKilos = Number(this.newSpeed);
    this.order.orderRealEnd = moment(new Date(this.today)).format("DD/MM/YYYY").toString();
    this.order.empRegister = this.user.userId;
    this.vehiclesService.EditVehicle(this.vehicleSelected).subscribe();
    this.ordersService.EndExistingOrder(this.order).subscribe();
    this.router.navigate(['orders']);
  }

  ngOnInit(): void {
  }

  refresh(){

  }

}
