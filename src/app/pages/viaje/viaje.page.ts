import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StoregeService } from 'src/app/services/storege.service';
declare var google;

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  rut:any;
  mapa: HTMLElement;
  viaje:any=[];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  auto:any;
  usuario:any=[];
  resultado:any;
  pasejerosviaje:any;


  constructor(private router : Router,private storage :StoregeService,private activatedRoute: ActivatedRoute,private loadingCtrl: LoadingController) { }

  
  async ngOnInit() {
    this.rut =this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDato('usuario',this.rut);
    this.viaje = await this.storage.getDatoViaje('Viaje',this.usuario.viaje)
    if(this.viaje!=undefined){
      this.pasejerosviaje=this.viaje.pasajeros.length
      this.showLoading()
      this.cargarMapa()
      this.calcularRuta()
    }
    
  }




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




cargarMapa() {
  const map: HTMLElement = document.getElementById('map1');
  this.mapa = new google.maps.Map(map, {
    center: { lat: -33.598479343601085, lng: -70.57909245930202 },
    zoom: 1
  })
  this.directionsRenderer.setMap(this.mapa)

}

async recargar(){
 this.ngOnInit()
}

calcularRuta() {


  var request = {
    origin: "Duoc UC: Sede Puente Alto - Avenida San Carlos, Puente Alto",
    destination: this.viaje.fin,
    travelMode: google.maps.TravelMode.DRIVING
  };
  this.directionsService.route(request, (resultado, status) => {
    this.directionsRenderer.setDirections(resultado);
  })
}

async empezar(){
  let aux =await this.storage.getDatoViaje('Viaje',this.usuario.viaje)
  aux.estado = "activo"
  this.storage.ModificarDatoViaje("Viaje",aux)
  this.ngOnInit()
}

async terminar(){
  this.storage.EliminarDatoViaje('Viaje',this.viaje.cod);
  this.usuario.viaje='';
  this.storage.ModificarDato('usuario',this.usuario)
  this.rut =this.activatedRoute.snapshot.paramMap.get('rut');
  this.usuario = await this.storage.getDato('usuario',this.rut);
  this.viaje = await this.storage.getDatoViaje('Viaje',this.usuario.viaje)
  this.ngOnInit();
  alert("Viaje terminado!")
}

async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Cargando....',
    duration: 500,
  });

  loading.present();
}

}
