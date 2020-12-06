import { Component, OnInit, Input } from '@angular/core';
import { VehicleType, VehicleTypeClass } from 'src/app/models/vehicleType.model';
import { Router, NavigationExtras } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { User } from 'src/app/models/user.model';
import { VehicleTypesService } from 'src/app/core/services/vehicle-types.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html',
  styleUrls: ['./vehicle-type-list.component.scss']
})
export class VehicleTypeListComponent implements OnInit{

  loggedUser:User;
  @Input()noResults: boolean = false;
  @Input()modelName:string;
  @Input()maxPrice:number = Math.max();
  @Input()minPrice:number;
  @Input()freeText:string;
  @Input()maxYear:number = new Date().getFullYear();
  @Input()minYear:number= this.maxYear;
  @Input()gear:string = "All";
  
  @Input() vehicleTypes: VehicleType[] = [];
  editList:VehicleType[] = [];
  
  added:boolean = false;
  vehicleTypeForm: FormGroup;
  editing:boolean = false;
  subZeroVal:boolean = false;
  subValueVal:boolean = false;
  inputs:AbstractControl[] = [];

  constructor(private router: Router, private vehicleTypesService:VehicleTypesService, private formBuilder: FormBuilder) {
    this.vehicleTypeForm = this.formBuilder.group({});
    if(localStorage.user != 'undefined')
      this.loggedUser = JSON.parse(localStorage.user);
   }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.vehicleTypesService.GetAllVehicleTypes().subscribe(
      list => {
        this.vehicleTypes = list;
        if(this.vehicleTypes.length > 0)
        this.minPrice = this.vehicleTypes[0].dailyCost;
      this.vehicleTypes.forEach(element => {
        if(this.minYear > element.prodYear)
          this.minYear = element.prodYear;
        if(this.maxPrice < element.dailyCost)
          this.maxPrice = element.dailyCost;
        if(this.minPrice > element.dailyCost)
          this.minPrice = element.dailyCost;
        
      });
    });
  }
  
  editVehicleType(selectedVehicleType:VehicleType){
    this.editList[0] = selectedVehicleType;
    this.vehicleTypes = this.editList;
    this.editing = true;
    this.vehicleTypeForm = this.formBuilder.group({
      'manufacturer': [selectedVehicleType.manufacturer, Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*')])],
      'modelName': [selectedVehicleType.modelName, Validators.compose([Validators.required])],
      'dailyCost': [selectedVehicleType.dailyCost, Validators.compose([Validators.required])],
      'dailyDelay': [selectedVehicleType.dailyDelay, Validators.compose([Validators.required])],
      'productionYear': [selectedVehicleType.prodYear, Validators.compose([Validators.required])],
      'gear': [selectedVehicleType.gear, Validators.compose([Validators.required])],
    });
    this.fillInputs();
  }

  fillInputs(){
    this.inputs[0] = this.vehicleTypeForm.controls['manufacturer'];
    this.inputs[1] = this.vehicleTypeForm.controls['modelName'];
    this.inputs[2] = this.vehicleTypeForm.controls['dailyCost'];
    this.inputs[3] = this.vehicleTypeForm.controls['dailyDelay'];
    this.inputs[4] = this.vehicleTypeForm.controls['productionYear'];
    this.inputs[5] = this.vehicleTypeForm.controls['gear'];
  }

  finishAndValidate(vehicleType: VehicleType){
    vehicleType.manufacturer = this.inputs[0].value;
    vehicleType.modelName = this.inputs[1].value;
    vehicleType.dailyCost = this.inputs[2].value;
    vehicleType.dailyDelay = this.inputs[3].value;
    vehicleType.prodYear = this.inputs[4].value;
    vehicleType.gear = this.inputs[5].value;
    if(vehicleType.dailyCost < 0 || vehicleType.dailyDelay < 0){
      this.subZeroVal = true;
      return;
    }
    this.subZeroVal = false;
    if(vehicleType.dailyCost > vehicleType.dailyDelay){
      this.subValueVal = true;
      return;
    }
    this.subValueVal = false;
  }

  finishEdit(){
    this.finishAndValidate(this.editList[0]);
    if(!this.subValueVal && !this.subZeroVal){
      this.vehicleTypesService.EditVehicleType(this.editList[0]).subscribe();
      this.editing = false;
      window.location.reload();
    }
  }

  cancel(){
    window.location.reload();
    this.refresh();
  }

  deleteVehicleType(selectedVehicleType:VehicleType){
    if(confirm('Are sure you want to delete ' + selectedVehicleType.modelName + '?')){
      localStorage.vehicles = undefined;
      this.vehicleTypesService.DeleteVehicleType(selectedVehicleType.modelId).subscribe();
      window.location.reload();
    }
  }

  addVehicleType(){
    this.added = true;
    this.vehicleTypes = [new VehicleTypeClass()];
    this.vehicleTypeForm = this.formBuilder.group({
      'manufacturer': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])],
      'modelName': ['', Validators.compose([Validators.required])],
      'dailyCost': ['', Validators.compose([Validators.required])],
      'dailyDelay': ['', Validators.compose([Validators.required])],
      'productionYear': ['', Validators.compose([Validators.required])],
      'gear': ['Manual', Validators.compose([Validators.required])],
    });
    this.fillInputs();
  }

  confirmVehicleType(){
    this.finishAndValidate(this.vehicleTypes[0]);
    if(!this.subValueVal && !this.subZeroVal){
      this.vehicleTypesService.AddNewVehicleType(this.vehicleTypes[0]).subscribe();
      this.editing = false;
      window.location.reload();
    }
  }
}
