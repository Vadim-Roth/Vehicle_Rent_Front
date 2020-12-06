import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { VehicleType } from 'src/app/models/vehicleType.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

//This service interacts with the functions that the server provides on { VehicleTypes/ }

@Injectable({
  providedIn: 'root'
})
export class VehicleTypesService {

  serverUrl = environment.serverUrl;

  //{GET}
  GetAllVehicleTypes(): Observable<VehicleType[]> {
    return this.httpClient.get<VehicleType[]>(`${this.serverUrl}VehicleTypes/GetAllVehicleTypes`);
  }

  GetVehicleType(id: number): Observable<VehicleType>{
    return this.httpClient.get<VehicleType>(`${this.serverUrl}VehicleTypes/GetVehicleType/${id}`);
  }

  //{POST}
  AddNewVehicleType(vehicleType: VehicleType): Observable<VehicleType>{
    return this.httpClient.post<VehicleType>(`${this.serverUrl}VehicleTypes/AddNewVehicleType/`, vehicleType, httpOptions);
  }

  //{PUT}
  EditVehicleType(vehicleType: VehicleType): Observable<VehicleType>{
    return this.httpClient.put<VehicleType>(`${this.serverUrl}VehicleTypes/EditVehicleType`, vehicleType);
  }

  //{DELETE}
  DeleteVehicleType(modelId: number){
    return this.httpClient.delete(`${this.serverUrl}VehicleTypes/DeleteVehicleType/${modelId}`);
  }
  
  constructor(private httpClient: HttpClient) { }

  


}



