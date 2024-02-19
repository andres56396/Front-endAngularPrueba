import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


import { Estudiante } from './Interfaces/estudiante';
import { EstudianteService } from './Services/estudiante.service';



import{ModalAsigancionesComponent} from './Modal/modal-asiganciones/modal-asiganciones.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit{

  displayedColumns: string[] = ['IDestudiante','Nombre', 'Email','Acciones'];
  dataSource = new MatTableDataSource<Estudiante>();

  constructor(
    private _EstudianteServicio:EstudianteService,    
    public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.mostrarEstudiantes();
    
  }
  
  title = 'FrontPrueba';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(dataEstudiante: Estudiante) {
    this.dialog.open(ModalAsigancionesComponent,{
      disableClose:true,
      width:"800px",
      data:dataEstudiante
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEstudiantes(){
    this._EstudianteServicio.getlis().subscribe({
      next:(dataResponse) =>{
        console.log(dataResponse)
        this.dataSource.data=dataResponse;        
      },error:(e) =>{}
    })
  }

 

}
