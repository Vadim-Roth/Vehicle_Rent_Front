import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Branch } from '../../models/branch.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

//This service interacts with the functions that the server provides on { Branches/ }

@Injectable({
  providedIn: 'root'
})

export class BranchesService {

  serverUrl = environment.serverUrl;

  //{GET}
  GetAllBranches(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>(`${this.serverUrl}Branches/GetAllBranches`);
  }

  GetBranchById(id: number): Observable<Branch>{
    return this.httpClient.get<Branch>(`${this.serverUrl}Branches/GetBranch/${id}`);
  }

  GetBranchByLocation(location: string): Observable<Branch>{
    return this.httpClient.get<Branch>(`${this.serverUrl}Branches/GetBranchByLocation/${location}`);
  }

  //{POST}
  AddNewBranch(branch: Branch): Observable<Branch>{
    return this.httpClient.post<Branch>(`${this.serverUrl}Branches/AddNewBranch`, branch, httpOptions);
  }
  
  //{PUT}
  EditBranch(branch: Branch): Observable<Branch>{
    return this.httpClient.put<Branch>(`${this.serverUrl}Branches/EditBranch/`, branch);
  }

  //{DELETE}
  DeleteBranch(branchId: number){
    return this.httpClient.delete(`${this.serverUrl}Branches/DeleteBranch/${branchId}`);
  }

  constructor(private httpClient: HttpClient) { }
}
