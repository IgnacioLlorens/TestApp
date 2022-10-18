import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoregeService } from 'src/app/services/storege.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  constructor(private storage:StoregeService,private router:Router,private activatedRoute:ActivatedRoute) { }

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut')
    this.viajes=await this.storage.getDatos('Viaje')
    console.log(this.viajes)
    
  }
  rut:any;
  viajes:any;
  final:any;

  rescate(fin,cod){
    this.ver(fin,cod)
  }

  async ver(fin,cod){
    let datos : NavigationExtras = {
      state:{
        fin:fin,
        cod:cod,
        rut:this.rut
      } 
  };
  this.router.navigate(["/prueba"],datos)
}

  async subir(cod){
    let aux=await this.storage.getDatoViaje('Viaje',cod)
    aux.pasajeros.push(this.rut)
    if(aux.pasajeros.length == aux.capasidad){
      aux.isfull = true;
    }
    this.storage.ModificarDatoViaje('Viaje',aux)
    var aux2 =await this.storage.getDato('usuario',this.rut);
    aux2.viaje = cod;
    await this.storage.ModificarDato('usuario',aux2);
    this.viajes=await this.storage.getDatos('Viaje')
  }

}
