import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoregeService } from 'src/app/services/storege.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validadores } from 'src/app/services/validadores';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  alumno = new FormGroup({
    rut : new FormControl('',[Validators.required,Validators.pattern('[0-9]{7,8}-[0-9Kk]{1}'),validadores.ruteo]),
    correo : new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    nombre : new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(60),validadores.whitespaceValidator,validadores.dobleespacio]),
    fechaNacimiento : new FormControl('',[Validators.required,validadores.menor17]),
    genero : new FormControl('',[Validators.required]),
    pass : new FormControl('',[Validators.required]),
    tipo_usuario :new FormControl("Pasajero"),
    idlicencia :new FormControl(""),
    viaje :new FormControl(""),
  });

  //usuarios: any[] =[];

  pass2:string;

  constructor(private usuarioService: UsuarioService,private router:Router,private storage: StoregeService) { }

  ngOnInit() {
    //this.usuarios =this.usuarioService.obtenerUsuarios();
  }

 registrar(){
  if(this.alumno.controls.pass.value != this.pass2){
    alert("contarseña incorrecta");
    return;
  }
  this.storage.agregar('usuario',this.alumno.value)
  alert("alumno registrado");
  this.router.navigate(["/login"]);
  //this.alumno.reset();
  //this.pass2 = '';
 }
  

}
