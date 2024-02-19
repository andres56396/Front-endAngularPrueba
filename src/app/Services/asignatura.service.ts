import { Injectable } from '@angular/core';

import{HttpClient}from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Asignatura } from '../Interfaces/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint +"api/Asignatura/"

  constructor(private http:HttpClient) { }

  getlis(id: number):Observable<Asignatura[]>{
    return this.http.get<Asignatura[]>(`${this.apiUrl}listarNoRegistradasAignatura?id=${id}`);
  }
  
}
