import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: any[] = [ 
    {
      rut:"",
      correo:"",
      nombre: "",
      fechaNacimiento :"",
      genero:"",
      idlicencia:"",
      pass:"",
      tipo_usuario:""},
    {
    rut:"11111111-1",
    correo:"admin@duocuc.cl",
    nombre: "diosito",
    fechaNacimiento :"1000-02-02",
    genero:"hombre",
    idlicencia:"",
    pass:"sasasa",
    tipo_usuario:"administrador"
  },{
  rut:"65879231-8",
  correo:"lavi@duoc.cl",
  nombre: "lavieja",
  fechaNacimiento :"1000-02-02",
  genero:"hombre",
  idlicencia:"",
  pass:"sesese",
  tipo_usuario:"Pasajero"},
  {
  rut:"12563549-0",
  correo:"relo@profesor.duoc.cl",
  nombre: "reloko",
  fechaNacimiento :"1000-02-02",
  genero:"hombre",
  idlicencia:"111111111",
  pass:"sisisi",
  tipo_usuario:"Conductor"
  }];

  isAuthenticated= new BehaviorSubject(false);

  constructor(private router:Router) { }

  agregarUsuario(usuario):boolean{
    var registrado :boolean = false
    if(this.obtenerUsuario(usuario.rut)==undefined){
      this.usuarios.push(usuario);
      registrado=true
      return registrado
    }
    else{
      return registrado
    }
  };

  elimnarUsuario(rut){
    this.usuarios.forEach((usu, index) => {
      if(usu.rut==rut){
        this.usuarios.splice(index,1);
      }
    });

  };

  modificarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;

  };
  obtenerUsuario(rut){
    return this.usuarios.find(usuario => usuario.rut == rut);
  };
  
  obtenerUsuariocorreo(correo){
    return this.usuarios.find(usuario => usuario.correo == correo);
  };

  obtenerUsuarios(){
    return this.usuarios;
  };

  credencialUsuario(rut,pass){
    return this.usuarios.find(usuario => usuario.rut == rut && usuario.pass==pass );
  };

  credencialUsuario2(correo,pass){
    var usuarioLogin:any;
    usuarioLogin = this.usuarios.find(usuario => usuario.correo == correo && usuario.pass==pass );
    if(usuarioLogin != undefined){
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
  };

  getAuth(){
    return this.isAuthenticated.value;
  }

  logAuth(){
    this.isAuthenticated.next(false);
    this.router.navigate(["/login"])
  }

}
