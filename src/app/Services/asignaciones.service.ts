import { Injectable } from '@angular/core';

import{HttpClient}from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Asignaciones } from '../Interfaces/asignaciones';


@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint +"api/Asignaciones/"

  constructor(private http:HttpClient) { }

  getlis(id: number):Observable<Asignaciones[]>{
    return this.http.get<Asignaciones[]>(`${this.apiUrl}ListarCompleta?id=${id}`)     
  }

  add(modelo:Asignaciones):Observable<Asignaciones>{
     return this.http.post<Asignaciones>(`${this.apiUrl}RegitrarAsignacion?detalle=${modelo.detalle}&IDEstudiante=${modelo.idEstudiante}&idAsignatura=${modelo.idAsignatura}`,modelo);
  }

   delete(idAsignacion:number):Observable<Asignaciones>{
    return this.http.delete<Asignaciones>(`${this.apiUrl}EliminarAsignacion?idAsignacion=${idAsignacion}`);
   
   }

}
