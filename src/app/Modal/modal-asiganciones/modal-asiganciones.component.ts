import { Component, Inject, OnInit ,inject,ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

import { Asignatura} from 'src/app/Interfaces/asignatura';
import { Estudiante } from 'src/app/Interfaces/estudiante';

import { Asignaciones } from 'src/app/Interfaces/asignaciones';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { AsignacionesService } from 'src/app/Services/asignaciones.service';

import { AsignaturaService } from 'src/app/Services/asignatura.service';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';




@Component({
  selector: 'app-modal-asiganciones',
  templateUrl: './modal-asiganciones.component.html',
  styleUrls: ['./modal-asiganciones.component.css']  
})
export class ModalAsigancionesComponent implements OnInit {

  displayedColumns: string[] = ['Asignatura','Detalle','Acciones'];
  dataSource = new MatTableDataSource<Asignaciones>();


   formAsignacion:FormGroup;
   tituloAccion:string = 'Materias';
   botonAccion:string ="Asignar";
   ListaAsignatura:Asignatura[]=[];

  constructor(private _AsigancionesSErvicio:AsignacionesService,
    private _AsignaturaServico:AsignaturaService,
    private dialofoReferencia:MatDialogRef<ModalAsigancionesComponent>,
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)public dataEstudiante:Estudiante    
    ) { 
      this.formAsignacion = this.fb.group({
        idAsignatura:['',Validators.required],        
        Detalle:['',Validators.required]
      })

         
      this._AsignaturaServico.getlis(dataEstudiante.idEstudiante).subscribe({
             next:(data)=>{
                     this.ListaAsignatura = data;
             },error:(e)=>{}
      })

    }

   

    mostrarAlerta(msg:string,accion:string){
      this._snackBar.open(msg,accion,{
        horizontalPosition:"end",
        verticalPosition:"top",
        duration:3000
      })
    }

    addAsignacion(){
       
      console.log(this.formAsignacion.value)

     const modelo:Asignaciones={
      idAsignacion:0,
      idEstudiante: this.dataEstudiante.idEstudiante,
      idAsignatura:this.formAsignacion.value.idAsignatura,
      detalle:this.formAsignacion.value.Detalle,
      estudiante: "",
      asignatura: ""
     }
     console.log(modelo.idEstudiante);   
     this._AsigancionesSErvicio.add(modelo).subscribe({
      next:(data)=>{    
            
      },
      error:(e)=>{
        console.log("Error pero Se creo la Asignacion")
        this.mostrarAlerta("Asignacion Creada","Listo");       
        this.dialofoReferencia.close();
      }
     })
     
    }

  ngOnInit(): void { 
    
    if(this.dataEstudiante){
      this.mostrarAsiganciones(this.dataEstudiante.idEstudiante);   
    
    this.formAsignacion.patchValue({
      Idestudiante:this.dataEstudiante.idEstudiante
    })
       
    }   
    
  }

  mostrarAsiganciones(id: number){
    this._AsigancionesSErvicio.getlis(id).subscribe({
      next:(dataResponse) =>{
        console.log(dataResponse)
        this.dataSource.data=dataResponse;        
      },error:(e) =>{}
    })
  }

  mostrarAsiganatura(id: number){
    this._AsignaturaServico.getlis(id).subscribe({
      next:(dataResponse) =>{
        console.log(dataResponse)        
      },error:(e) =>{}
    })
  }


  
  ModelEliminarAsignacion(dataAsignacion:Asignaciones){
    this.dialog.open(ModalEliminarComponent,{
      disableClose:true,      
    data:dataAsignacion
    }).afterClosed().subscribe(resultado =>{
      if(resultado==="Eliminar"){
        this._AsigancionesSErvicio.delete(dataAsignacion.idAsignacion).subscribe({
          next:(data)=>{    
            
          },
          error:(e)=>{
            console.log("Error pero Elinado")
            this.mostrarAlerta("Asignacion Eliminada","Listo");
            this.mostrarAsiganciones(this.dataEstudiante.idEstudiante); 
            this.mostrarAsiganatura(this.dataEstudiante.idEstudiante); 
            this._AsignaturaServico.getlis(this.dataEstudiante.idEstudiante).subscribe({
              next:(data)=>{
                      this.ListaAsignatura = data;
              },error:(e)=>{}
       })
       this.formAsignacion.patchValue({
        Idestudiante:this.dataEstudiante.idEstudiante
      })
            //this.dialofoReferencia.close();
          }
        })
      }

    })
  }
  
 

}
