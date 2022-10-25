
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoregeService } from 'src/app/services/storege.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {

  auto = new FormGroup({
    dueno : new FormControl(''),
    patente : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern('[A-Za-z]{1,2}[A-Za-z0-9]{1,2}[0-9]{1,2}')]),
    marca : new FormControl('',[Validators.required,Validators.minLength(3)]),
    modelo : new FormControl(''),
    capasidad:new FormControl('',[Validators.required,Validators.min(1),Validators.max(10)]),
    color : new FormControl(''),
    nchasis : new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
  });

  usuario:any;
  rut:any;
  alerta:any;
  constructor(private usuarioService: UsuarioService,private router:Router, private storage:StoregeService,private activatedRoute: ActivatedRoute,private location:Location) { }

  ngOnInit() {
    this.rut = this.router.getCurrentNavigation().extras.state.rut;
    console.log(this.rut)
  }


  

  async agregarAuto(){
    this.auto.get('dueno').setValue(this.rut);
    this.alerta = await this.storage.agregarauto('autos',this.auto.value)
    console.log(this.rut)
    this.location.back()
  }
 

}






