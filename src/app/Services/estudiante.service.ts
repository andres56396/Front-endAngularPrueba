import { Injectable } from '@angular/core';

import{HttpClient}from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Estudiante } from '../Interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint +"api/Estudiante/"

  constructor(private http:HttpClient) { }

  getlis():Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.apiUrl}ListarCompleta`);
  }

}
