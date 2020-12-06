import { Component, OnInit } from '@angular/core';
import { VehicleType } from 'src/app/models/vehicleType.model';

@Component({
  selector: 'app-homepg',
  templateUrl: './homepg.component.html',
  styleUrls: ['./homepg.component.scss']
})
export class HomepgComponent implements OnInit {

  vehicleTypes:VehicleType[];

  constructor() { }

  ngOnInit(): void {
    if(localStorage.vehicles == 'undefined'){
      this.vehicleTypes = [];
      localStorage.vehicles == this.vehicleTypes;
    }
    else
      this.vehicleTypes = localStorage.vehicles;
  }

}
