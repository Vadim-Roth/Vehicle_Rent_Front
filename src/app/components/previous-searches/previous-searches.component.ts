import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleType } from 'src/app/models/vehicleType.model';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-previous-searches',
  templateUrl: './previous-searches.component.html',
  styleUrls: ['./previous-searches.component.scss']
})
export class PreviousSearchesComponent implements OnInit {

  vehicleTypes:VehicleType[];

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.vehicles != 'undefined')
      this.vehicleTypes = JSON.parse(localStorage.vehicles);
    //console.log(this.vehicleTypes);
  }

  navToVehicle(modelId: number){
    this.router.navigate(['/vehicles', modelId]);
  }

}
