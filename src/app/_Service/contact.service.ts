import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ContactModel} from '../_model/contact-model.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}
  GetAll(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}GetAll`);
  }
  
  Create(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}Insert`, data);
  }

  Update(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}Update`, data);
  }

  Delete(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}Delete/${id}`)
  }

}
