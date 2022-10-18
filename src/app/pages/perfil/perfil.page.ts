import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoregeService } from 'src/app/services/storege.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  alumno = new FormGroup({
    rut : new FormControl({value: '', disabled:true},[Validators.required,Validators.pattern('[0-9]{7,8}-[0-9Kk]{1}')]),
    correo : new FormControl({value: '', disabled:true},[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    nombre : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(50)]),
    fechaNacimiento : new FormControl('',[Validators.required]),
    genero : new FormControl('',[Validators.required]),
    idlicencia : new FormControl('',[Validators.pattern('[0-9]{9}')]),
    pass : new FormControl('',[Validators.required]),
    tipo_usuario :new FormControl({value: '', disabled:true})
  });
  
  usuarios: any[] =[];

  pass2:string;

  rut:string;
  usuario : any;

  constructor(private activatedRoute: ActivatedRoute,private usuarioservice :UsuarioService,private storage :StoregeService) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut')
    this.usuario = this.usuarioservice.obtenerUsuario(this.rut)
    console.log(this.rut)
    console.table(this.usuario)
    this.buscar(this.rut)

  }

  async buscar(rut){
    var encontrado = await this.storage.getDato('usuario',rut);
    this.alumno.setValue(encontrado);
    this.pass2=encontrado.pass;
  }

}
