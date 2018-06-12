import { Component, OnInit } from '@angular/core';
import { Lista } from '../../app/clases/listas';
import { ListaItem } from '../../app/clases/lista-item';
import { AlertController, NavController } from 'ionic-angular';

import {ListaDeseosService} from '../../app/services/lista-deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.component.html',
})
export class AgregarComponent implements OnInit {
  nombreLista:string="";
  nombreItem:string="";

  items:ListaItem[]=[];


  constructor(
    public alertCtrl:AlertController,
    public navCtrl:NavController,
    public _listaDeseos:ListaDeseosService
  ) {  }

  ngOnInit() {}

  agregar(){
    if(this.nombreItem.length==0){
      return;
    }
    let item=new ListaItem();
    item.nombre=this.nombreItem;

    this.items.push(item);
    this.nombreItem="";
  }
  borrarItem(idx:number){
    this.items.splice(idx,1);
  }
  guardarLista(){
    if(this.nombreLista.length==0){
      const alert = this.alertCtrl.create({
        title: 'Nombre de la lista',
        subTitle: 'El nombre de la lista es obligatorio!',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    let lista=new Lista(this.nombreLista);
    lista.items=this.items;

    //this._listaDeseos.listas.push(lista);
    this._listaDeseos.agregarLista(lista);
    this.navCtrl.pop();
  }
}
