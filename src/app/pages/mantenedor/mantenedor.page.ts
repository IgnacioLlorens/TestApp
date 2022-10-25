import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { StoregeService } from 'src/app/services/storege.service';


@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit {

  persona:any={
    rut:"",
    nombre:""
  };
  personas:any[]=[];

  KEY_PERSONA = 'personas';

  constructor(private storage:StoregeService, private loadingctrl: LoadingController) { }

  async ngOnInit() {
    await this.cargarPersonas()
  }

  async cargarPersonas(){
    this.personas=await this.storage.getDatos(this.KEY_PERSONA)
  }

  async registrar(){
    var respuesta:boolean = await this.storage.agregar(this.KEY_PERSONA,this.persona)
    if(respuesta == true){
      alert("registrado");
      await this.cargarPersonas();
    }
  }
  async eliminar(rut){
    await this.storage.EliminarDato(this.KEY_PERSONA,rut)
    await this.cargando()
    await this.cargarPersonas();
  }

  async buscar(rut){
    this.persona = await this.storage.getDato(this.KEY_PERSONA,rut)
    
  }

  async modificar(){
    await this.storage.ModificarDato(this.KEY_PERSONA,this.persona)
    await this.cargarPersonas();
  }

  async cargando(){
    const loading =await this.loadingctrl.create({
      message:"",
      duration: 1000
    })
    loading.present();
  }



}
