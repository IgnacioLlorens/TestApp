import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { StoregeService } from 'src/app/services/storege.service';

@Component({
  selector: 'app-listauto',
  templateUrl: './listauto.page.html',
  styleUrls: ['./listauto.page.scss'],
  providers: [NavParams]
})
export class ListautoPage implements OnInit {

  constructor(private router:Router,private storage :StoregeService,private activatedRoute: ActivatedRoute,public navCtrl: NavController, public navParams: NavParams) { }

  async ngOnInit() {
    
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut')
    this.usuario= await this.storage.getDato('usuario',this.rut)
    this.autos = await this.storage.getDatos('autos')
  }
  rut:any;
  usuario:any;
  autos:any;


  async ionViewWillEnter(){
    this.autos = await this.storage.getDatos('autos')
  }
  
  async recargar(){
    this.autos = await this.storage.getDatos('autos')
  }

  async masautos(){
    var aux = await this.storage.getDato('usuario',this.rut)
    console.log(aux.rut)
    let datos : NavigationExtras = {
      state:{
        rut:aux.rut
      } 
  };
  this.router.navigate(["/autos"],datos)
}

async eliminar(patente){
  await this.storage.EliminarDatoAuto('autos',patente)
  this.autos = await this.storage.getDatos('autos')
}

}
