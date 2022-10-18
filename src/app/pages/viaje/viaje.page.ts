import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { StoregeService } from 'src/app/services/storege.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private router : Router,private storage :StoregeService,private activatedRoute: ActivatedRoute) { }

  
  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut')
    console.log(this.rut)
  }
  rut:any;



  async masviaje(){
    var aux = await this.storage.getDato('usuario',this.rut)
    console.log(aux.rut)
    let datos : NavigationExtras = {
      state:{
        rut:aux.rut
      } 
  };
  this.router.navigate(["/geoloca"],datos)
}
}
