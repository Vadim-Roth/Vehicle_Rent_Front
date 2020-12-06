import { Component, OnInit, Input } from '@angular/core';
import { VehicleTypesService } from 'src/app/core/services/vehicle-types.service';
import { VehicleType } from 'src/app/models/vehicleType.model';

@Component({
  selector: 'app-vehicle-type-home',
  templateUrl: './vehicle-type-home.component.html',
  styleUrls: ['./vehicle-type-home.component.scss']
})
export class VehicleTypeHomeComponent implements OnInit {

  @Input()vehicleTypes: VehicleType[] = [];

  constructor(private vehicleTypesService: VehicleTypesService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.vehicleTypesService.GetAllVehicleTypes().subscribe(
      list => {this.vehicleTypes = list;
    });
  }
}
