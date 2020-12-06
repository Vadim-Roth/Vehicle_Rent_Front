import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

//This service interacts with the functions that the server provides on { Users/ }

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  serverUrl = environment.serverUrl;

  //{GET}
  GetAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.serverUrl}Users/GetAllUsers`);
  }

  GetUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.serverUrl}Users/GetUser/${id}`);
  }

  IsUserUnique(userName: string){
    return this.httpClient.get(`${this.serverUrl}Users/IsUserUnique/${userName}`, {responseType: 'text'});
  }

  GetUserByNick(userName: string): Observable<User>{
    return this.httpClient.get<User>(`${this.serverUrl}Users/GetUserByNick/${userName}`);
  }

  Login(logInfo: string): Observable<User>{
    return this.httpClient.get<User>(`${this.serverUrl}Users/Login/${logInfo}`);
  }
  
  //{POST}
  AddNewUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.serverUrl}Users/AddNewUser/`, user, httpOptions);
  }
  
  UploadImage(file){
    return this.httpClient.post(`${this.serverUrl}Users/UploadImage/`, file);
  }
  
  //{PUT}
  EditUser(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.serverUrl}Users/EditUser/`, user);
  }

  //{DELETE}
  DeleteUser(userId: number){
    return this.httpClient.delete(`${this.serverUrl}Users/DeleteUser/${userId}`);
  }

  constructor(private httpClient: HttpClient) { }
}
