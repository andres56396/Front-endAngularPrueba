import { Component, OnInit,Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Asignaciones } from 'src/app/Interfaces/asignaciones';



@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  constructor(
    private dialofoReferencia:MatDialogRef<ModalEliminarComponent>,    
    @Inject(MAT_DIALOG_DATA)public dataAsigancion:Asignaciones
    )
   { }

  ngOnInit(): void {
  }

  confirmar_Eliminar(){
    if(this.dataAsigancion){
      this.dialofoReferencia.close("Eliminar")
    }
  }


}
