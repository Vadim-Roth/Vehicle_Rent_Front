import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

//This service interacts with the functions that the server provides on { Vehicles/ }

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  serverUrl = environment.serverUrl;

  //{GET}
  GetAllVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`${this.serverUrl}Vehicles/GetAllVehicles`);
  }

  GetVehicleByVehicleNumber(vehicleNumber: number): Observable<Vehicle>{
    return this.httpClient.get<Vehicle>(`${this.serverUrl}Vehicles/GetVehicle/${vehicleNumber}`);
  }

  GetVehiclesByModel(modelId: number): Observable<Vehicle[]>{
    return this.httpClient.get<Vehicle[]>(`${this.serverUrl}Vehicles/GetVehiclesByModel/${modelId}`);
  }

  //{POST}
  AddNewVehicle(vehicle: Vehicle): Observable<Vehicle>{
    return this.httpClient.post<Vehicle>(`${this.serverUrl}Vehicles/AddNewVehicle/`, vehicle, httpOptions);
  }
  
  //{PUT}
  EditVehicle(vehicle: Vehicle): Observable<Vehicle>{
    return this.httpClient.put<Vehicle>(`${this.serverUrl}Vehicles/EditVehicle`, vehicle);
  }

  //{DELETE}
  DeleteVehicle(vehicleNumber: number){
    return this.httpClient.delete(`${this.serverUrl}Vehicles/DeleteVehicle/${vehicleNumber}`);
  }
  
  constructor(private httpClient: HttpClient) { }
}
