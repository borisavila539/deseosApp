import { Component, Input, OnInit } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;
  constructor(public deseosService: DeseosService, public router: Router, private alertCtrl: AlertController) { 

  }

  ngOnInit() {}
  listaSeleccionada(lista:Lista){
    if(this.terminada)
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)
    else
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)
  }  

  borrarLista(lista:Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
      const alert = await this.alertCtrl.create({
        header:'Editar Lista',
        inputs:[
          {
            name:'titulo',
            type: 'text',
            value: lista.titulo
          }
        ],
        buttons:[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: ()=>{
              console.log('cancelado');
              
            }
          },
          {
            text: 'modificar',
            handler: (data) =>{
              if(data.titulo.lenght === 0){
                return
              }
              lista.titulo = data.titulo;
              this.deseosService.editarLista(lista)
            }
          }
        ]
      })
      alert.present();
  }
}
