
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
    patente : new FormControl(''),
    marca : new FormControl(''),
    modelo : new FormControl(''),
    capasidad:new FormControl(''),
    color : new FormControl(''),
    nchasis : new FormControl('')
  });

  usuario:any;
  rut:any;
  constructor(private usuarioService: UsuarioService,private router:Router, private storage:StoregeService,private activatedRoute: ActivatedRoute,private location:Location) { }

  ngOnInit() {
    this.rut = this.router.getCurrentNavigation().extras.state.rut;
    console.log(this.rut)
  }


  

  async agregarAuto(){
    this.auto.get('dueno').setValue(this.rut);
    await this.storage.agregarauto('autos',this.auto.value)
    console.log(this.rut)
    this.location.back()
  }
 

}






