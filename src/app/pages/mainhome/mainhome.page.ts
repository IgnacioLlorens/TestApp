import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoregeService } from 'src/app/services/storege.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})
export class MainhomePage implements OnInit {

  usuario : any;
  viajes : any;

  constructor(private activatedRoute: ActivatedRoute, private router : Router,private usuariocervice : UsuarioService, private storage :StoregeService) { }

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    this.recuperarViajes()
  }
  logout(){
    this.storage.logAuth()
  }

  async recuperarViajes(){
    this.viajes=await this.storage.getDatos('Viaje')
  }

  verMapa(){
    this.router.navigate(['/prueba'])
  }

}
