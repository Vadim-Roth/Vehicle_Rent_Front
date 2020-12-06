import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { VehiclesService } from 'src/app/core/services/vehicles.service';
import { Vehicle, VehicleClass } from 'src/app/models/vehicle.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BranchesService } from 'src/app/core/services/branches.service';
import { Branch } from 'src/app/models/branch.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleTypesService } from 'src/app/core/services/vehicle-types.service';
import { User } from 'src/app/models/user.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
  
})
export class VehicleListComponent implements OnInit {
  
  //Initiantion
  logged:boolean = false;
  loggedUser:User;
  vehicleTypeSelected: VehicleType;
  private sub: any;
  @Input()vehicles:Vehicle[] = [];
  modelId: number;

  //Search
  allBranches:Branch[] = [];
  availability: string = "All";
  branchesSearch: string = "All";
  vehicleNumber: number;

  //Branch pop-up
  @Input()infoClicked:boolean = false;
  selectedBranch: Branch;

  //Editing options
  vehicleForm: FormGroup;
  inputs:AbstractControl[] = [];
  added:boolean = false;
  newVehicle:Vehicle;
  editing:boolean = false;
  subZeroVal:boolean = false;
  currentLocation:string;
  editingBranch:boolean = false;

  constructor(private route: ActivatedRoute, private vehiclesService: VehiclesService,
    private branchesService: BranchesService, private vehicleTypesService: VehicleTypesService,
    private formBuilder: FormBuilder) {
      this.vehicleForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.modelId = +params['modelId']; // (+) converts string 'id' to a number\
       if(localStorage.user != 'undefined'){
        this.logged = true;
        this.loggedUser = JSON.parse(localStorage.user);
       }
       else
        this.logged = false;
      this.refresh();
    });
  }

  refresh(){
    this.branchesService.GetAllBranches().subscribe(
      allBranchesRecieved => { this.allBranches = allBranchesRecieved;}
    );
    this.vehiclesService.GetVehiclesByModel(this.modelId).subscribe(
      list => { this.vehicles = list; }
    );
    this.vehicleTypesService.GetVehicleType(this.modelId).subscribe(
      vehicleType => {
        this.vehicleTypeSelected = vehicleType;
        let vehiList:VehicleType[];
        if(localStorage.vehicles == 'undefined')
          vehiList = [];
        else
          vehiList = JSON.parse(localStorage.vehicles);
        let found = false;
        for(let vehicle of vehiList)
          if(vehicle.modelId == vehicleType.modelId)
            found = true;
        if(!found)
        {
          if(vehiList.length > 2){
            vehiList.shift();
          }
          vehiList.push(this.vehicleTypeSelected);
          localStorage.vehicles = JSON.stringify(vehiList);
        }
      }
    );
  }

  editBranch(){
    this.editingBranch = true;
  }

  openInfo(branch: Branch){
    this.infoClicked = true;
    this.branchesService.GetBranchById(branch.branchId)
      .subscribe( selBranch => { this.selectedBranch = selBranch; }
      );
    this.refresh();
  }

  closeInfo(){
    this.infoClicked = false;
    this.refresh();
  }

  addVehicle(){
    this.added = true;
    this.editingBranch = true;
    this.vehicles = [];
    this.newVehicle = new VehicleClass();
    this.vehicleForm = this.formBuilder.group({
      'vehicleNumber': ['', Validators.compose([Validators.required])],
      'currentKilos': ['', Validators.compose([Validators.required])],
      'branchLocations': [this.allBranches[0], Validators.compose([Validators.required])],
      'isFunctional': [true, Validators.compose([Validators.required])],
      'isAvailable': [true, Validators.compose([Validators.required])]
    });
    this.fillInputs();
  }

  fillInputs(){
    this.inputs[0] = this.vehicleForm.controls['vehicleNumber'];
    this.inputs[1] = this.vehicleForm.controls['currentKilos'];
    this.inputs[2] = this.vehicleForm.controls['branchLocations'];
    this.inputs[3] = this.vehicleForm.controls['isFunctional'];
    this.inputs[4] = this.vehicleForm.controls['isAvailable'];
  }

  editVehicle(selectedVehicle:Vehicle){
    this.editing = true;
    this.vehicles = [selectedVehicle];
    if(selectedVehicle.branchId > 0)
      this.branchesService.GetBranchById(selectedVehicle.branchId).subscribe(
        branchRecieved => { this.currentLocation = branchRecieved.location; }
      );
    else
      this.currentLocation = "Deleted Branch";
    this.vehicleForm = this.formBuilder.group({
      'currentKilos': [selectedVehicle.currentKilos, Validators.compose([Validators.required])],
      'branchLocations': [this.allBranches[0]],
      'isFunctional': [selectedVehicle.isFunctional, Validators.compose([Validators.required])],
      'isAvailable': [selectedVehicle.isAvailable, Validators.compose([Validators.required])]
    });
    this.fillInputs();
  }

  finishAndValidate(vehicle: Vehicle){
    vehicle.vehicleNumber = this.inputs[0].value;
    vehicle.currentKilos = this.inputs[1].value;
    if(vehicle.vehicleNumber < 0 || vehicle.currentKilos < 0){
      this.subZeroVal = true;
      return;
    }
    this.subZeroVal = false;
    if(this.editingBranch){
      if(this.inputs[2].value == null)
        vehicle.branchId = this.allBranches[0].branchId;
      else{
        for(let i of this.allBranches){
          if(i.location === this.inputs[2].value || i.location === this.inputs[2].value.location){
            vehicle.branchId = i.branchId;
            break;
          }
        }
      }
    }
    vehicle.isFunctional = (this.inputs[3].value == "true" || this.inputs[3].value == true) ;
    vehicle.isAvailable = (this.inputs[4].value == "true" || this.inputs[4].value == true);
  }

  confirmVehicle(){
    this.finishAndValidate(this.newVehicle);
    if(!this.subZeroVal){
      this.newVehicle.modelId = this.vehicleTypeSelected.modelId;
      this.vehiclesService.AddNewVehicle(this.newVehicle).subscribe();
      window.location.reload();
    }
  }

  finishEdit(){
    this.finishAndValidate(this.vehicles[0]);
    if(!this.subZeroVal){
      this.vehiclesService.EditVehicle(this.vehicles[0]).subscribe();
      window.location.reload();
    }
  }

  cancel(){
    window.location.reload();
  }

  deleteVehicle(vehicle:Vehicle){
    if(confirm('Are sure you want to delete ' + vehicle.vehicleNumber + '?')){
      this.vehiclesService.DeleteVehicle(vehicle.vehicleNumber).subscribe();
      window.location.reload();
    }
  }

}
