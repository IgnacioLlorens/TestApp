import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StoregeService } from 'src/app/services/storege.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario :any;
  pass :any;

  admin:any={
    rut:"11111111-1",
    correo:"admin@duocuc.cl",
    nombre: "diosito",
    fechaNacimiento :"1000-02-02",
    genero:"hombre",
    idlicencia:"",
    pass:"sasasa",
    tipo_usuario:"administrador",
    viaje:""
  }

  pasejero:any={
    rut:"2222222-8",
    correo:"pasejero@duocuc.cl",
    nombre: "pasajero",
    fechaNacimiento :"1000-02-02",
    genero:"hombre",
    idlicencia:"",
    pass:"sasasa",
    tipo_usuario:"Pasajero",
    viaje:""
  }

  conductor:any={
    rut:"3333333-1",
    correo:"conductor@duocuc.cl",
    nombre: "conductor",
    fechaNacimiento :"1000-02-02",
    genero:"hombre",
    idlicencia:"",
    pass:"sasasa",
    tipo_usuario:"Conductor",
    viaje:""
  }

  constructor(private toastController:ToastController,private router:Router,private usuarioService: UsuarioService,private storage:StoregeService) { }

  async ngOnInit() {

    await this.storage.agregar('usuario',this.admin)
    await this.storage.agregar('usuario',this.pasejero)
    await this.storage.agregar('usuario',this.conductor)
    if(await (await this.storage.getDatos('activo')).length != 0){
      let auxi = await this.storage.getDatos('activo');
      var aux = await this.storage.credenciales('usuario',auxi[0].rut,auxi[0].pass)
      let datos : NavigationExtras = {
        state:{
          usuario : aux
        }
      };
      this.router.navigate(["/mainhome"],datos);
    }

  }



  async login(){
    var aux = await this.storage.credenciales('usuario',this.usuario,this.pass)
    var aux2 = await this.storage.credenciales2('usuario',this.usuario,this.pass)
    console.log(aux2)
    if(aux != undefined ){
      if(aux.rut != ""){
        let datos : NavigationExtras = {
        state:{
          usuario : aux
        }
      };
      this.router.navigate(["/mainhome"],datos);
      this.usuario = "";
      this.pass="";
      this.storage.eliminarTodo('activo');
      this.storage.agregar('activo',aux);
    }}
    else if(aux2 != undefined ){
      if(aux2.rut != ""){
      let datos : NavigationExtras = {
        state:{
          usuario : aux2
        }
      };
      this.router.navigate(["/mainhome"],datos)
      this.usuario = "";
      this.pass="";
      this.storage.eliminarTodo('activo');
      this.storage.agregar('activo',aux2);
    }}
    else{
      this.presentToast();
    }
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'usuario o contaseña incorrectos',
      duration: 3000
    });
    toast.present();
  }


}
