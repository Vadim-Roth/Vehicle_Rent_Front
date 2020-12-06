import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common'; 
import { User } from 'src/app/models/user.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from 'src/app/core/services/vehicles.service';
import { VehicleTypesService } from 'src/app/core/services/vehicle-types.service';
import { Order, OrderClass } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/core/services/orders.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  private sub: any;
  user: User;
  vehicleTypeSelected: VehicleType;
  vehicleSelected: Vehicle;
  vehicleNumber: number;
  order:Order;

  orderAvailable:boolean = false;
  emptyDate:boolean = false;
  compareVal:boolean = false;
  firstDay:any;
  lastDay:any;
  daysBetween:number;
  totalPrice:number;
  today:Date = new Date();

  constructor(private router: Router, private route: ActivatedRoute, private location: Location,
    private vehiclesService:VehiclesService, private vehicleTypesService:VehicleTypesService,
    private ordersService:OrdersService) {
    this.sub = this.route.params.subscribe(params => {
      this.vehicleNumber = +params['vehicleNumber'];
      this.location.replaceState("/summary");
      this.user = JSON.parse(localStorage.user);
      this.vehiclesService.GetVehicleByVehicleNumber(this.vehicleNumber).subscribe(
        vehicleRecived => {this.vehicleSelected = vehicleRecived;
          this.vehicleTypesService.GetVehicleType(this.vehicleSelected.modelId).subscribe(
            vehicleTypeRecived => {this.vehicleTypeSelected = vehicleTypeRecived;}
          );}
      );
      
      if(localStorage.user == 'undefined')
        this.router.navigate(['homepg']);
   });
  }

  chooseDates(){
    if(this.firstDay == undefined || this.lastDay == undefined){
      this.emptyDate = true;
      this.orderAvailable = false;
      return; 
    }
    this.emptyDate = false;
    if(this.firstDay < new Date() || this.lastDay < new Date() ){
      this.orderAvailable = false;
      return;
    }
    if(this.lastDay < this.firstDay){
      this.compareVal = true;
      this.orderAvailable = false;
      return;
    }
    this.compareVal = false;
    this.order = new OrderClass();
    this.order.orderStart = this.firstDay.format("DD/MM/YYYY");
    this.order.orderEnd = this.lastDay.format("DD/MM/YYYY");
    this.order.custId = this.user.userId;
    this.order.vehicleNumber = this.vehicleSelected.vehicleNumber;
    this.daysBetween = Math.floor(this.lastDay - this.firstDay)/(1000*60*60*24) + 1;
    this.totalPrice = this.daysBetween * this.vehicleTypeSelected.dailyCost;
    this.orderAvailable = true;
  }
  
  public datePickerConfig = {
    disableKeypress : true,
    min: moment(this.today.setDate(this.today.getDate() + 1))
  };

  submit(){
    this.ordersService.StartNewOrder(this.order).subscribe();
    this.router.navigate(['/profile', this.user.userId]);
  }

  ngOnInit(): void {
  }
  
}
