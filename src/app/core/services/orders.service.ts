import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

//This service interacts with the functions that the server provides on { Orders/ }

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  serverUrl = environment.serverUrl;

  //{GET}
  GetAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.serverUrl}Orders/GetAllOrders`);
  }

  GetOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.serverUrl}Orders/GetOrder/${id}`);
  }

  GetAllUserOrders(userId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.serverUrl}Orders/GetAllUserOrders/${userId}`);
  }

  GetLastOrder(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.serverUrl}Orders/GetLastOrder/${orderId}`);
  }

  //{POST}
  StartNewOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.serverUrl}Orders/StartNewOrder`, order, httpOptions);
  }

  //{PUT}
  EndExistingOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.serverUrl}Orders/EndExistingOrder`, order, httpOptions);
  }

  EditOrder(order: Order): Observable<Order>{
    return this.httpClient.put<Order>(`${this.serverUrl}Orders/EditOrder`, order);
  }

  //{DELETE}
  DeleteOrder(orderId: number){
    return this.httpClient.delete(`${this.serverUrl}Orders/DeleteOrder/${orderId}`);
  }
}
