import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoregeService {
  datos: any[]=[];
  dato:any;
  isAuthenticated = new BehaviorSubject(false);

  constructor(private storage:Storage , private router:Router) {
    storage.create();

   }

  async agregar(key,dato){
    this.datos = await this.storage.get(key)||[];
    this.dato = await this.getDato(key,dato.rut);
    if(this.dato == undefined){
        this.datos.push(dato);
        await this.storage.set(key,this.datos);
        return true;
    };
    return false;
  }

  async eliminarTodo(key){
    this.datos = await this.storage.get(key)||[];
    this.datos=[];
    await this.storage.set(key,this.datos)
  }

  async agregarauto(key,dato){
    this.datos = await this.storage.get(key)||[];
    this.dato = await this.getDato(key,dato.patente);
    if(this.dato == undefined){
        this.datos.push(dato);
        await this.storage.set(key,this.datos);
        return true;
    };
    return false;
  }

  async getDato(key,id){
    this.datos = await this.storage.get(key)||[];
    this.dato = this.datos.find(persona=>persona.rut == id);
    return this.dato;
  }

  async getDatoViaje(key,id){
    this.datos = await this.storage.get(key)||[];
    this.dato = this.datos.find(viaje=>viaje.cod == id);
    return this.dato;
  }

  async getDatoAuto(key,id){
    this.datos = await this.storage.get(key)||[];
    this.dato = this.datos.findIndex(car=>car.patente == id);
    return this.dato;
  }

  async credenciales(key,rut,pass){
    this.datos = await this.storage.get(key)||[];
    this.dato = await this.datos.find(persona=>persona.rut == rut && persona.pass == pass);
    this.isAuthenticated.next(true);
    return this.dato

  }

  async credenciales2(key,correo,pass){
    this.datos = await this.storage.get(key)||[];
    this.dato = await this.datos.find(persona=>persona.correo == correo && persona.pass == pass);
    this.isAuthenticated.next(true);
    return this.dato

  }

  async getDatos(key):Promise<any[]>{
    this.datos = await this.storage.get(key);
    return this.datos;
  }

  async EliminarDato(key,id){
    this.datos = await this.storage.get(key)||[];
    this.datos.forEach((value,index)=>{
      if(value.rut == id){
        this.datos.splice(index,1);
      }
    });
  await this.storage.set(key,this.datos)
  }

  async EliminarDatoAuto(key,id){
    this.datos = await this.storage.get(key)||[];
    this.datos.forEach((value,index)=>{
      if(value.patente == id){
        this.datos.splice(index,1);
      }
    });
  await this.storage.set(key,this.datos)

  }
  async EliminarDatoViaje(key,id){
    this.datos = await this.storage.get(key)||[];
    this.datos.forEach((value,index)=>{
      if(value.cod == id){
        this.datos.splice(index,1);
      }
    });
  await this.storage.set(key,this.datos)

  }

  async ModificarDato(key,dato){
    this.datos = await this.storage.get(key)||[];
    var index = this.datos.findIndex(persona=>persona.rut==dato.rut);
    this.datos[index] = dato;
    await this.storage.set(key,this.datos);

  }

  async ModificarDatoViaje(key,dato){
    this.datos = await this.storage.get(key)||[];
    var index = this.datos.findIndex(viaje=>viaje.cod==dato.cod);
    this.datos[index] = dato;
    await this.storage.set(key,this.datos);

  }

  async agregarViaje(key,dato){
    this.datos = await this.storage.get(key)||[];
    this.dato = await this.getDato(key,dato.cod);
    if(this.dato == undefined){
        this.datos.push(dato);
        await this.storage.set(key,this.datos);
        return true;
    };
    return false;
  }
  
  getAuth(){
    return this.isAuthenticated.value;
  }

  logAuth(){
    this.isAuthenticated.next(false);
    this.eliminarTodo('activo')
    this.router.navigate(["/login"])
  }

}