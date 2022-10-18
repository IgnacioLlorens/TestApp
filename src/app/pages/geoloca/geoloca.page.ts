import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { StoregeService } from 'src/app/services/storege.service';
import {Location} from '@angular/common';

declare var google;

@Component({
  selector: 'app-geoloca',
  templateUrl: './geoloca.page.html',
  styleUrls: ['./geoloca.page.scss'],
})
export class GeolocaPage implements OnInit {


  viaje: any ={
    conductor:"",
    cod:"",
    auto:"",
    costo:"",
    hora:"",
    capasidad:"",
    isfull:false,
    nombre:"",
    inicio:{
      latitud:0,
      longitud:0
    },
    fin:{},
    pasajeros:[]

  }
  index:any;
  ruteo:any;
  locacion:any;
  lugar:string;
  autocompleto: any;
  geolocation: any;
  place: any;
  latitud: number;
  longitud: number;
  latitud1: number;
  longitud1: number;
  map: any;
  marker:any;
  search :any;
  cualquiera: any;
  cap:any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private geo: Geolocation,private storage : StoregeService,private router:Router,private location:Location) { }

  async ngOnInit() {
    this.ruteo = this.router.getCurrentNavigation().extras.state.rut
    this.cualquiera = await this.storage.getDatos('autos')
    await this.cargarMap()
    this.obtenerUbiacion()
    this.autoCompletado(this.map,this.marker)
    
    
  }

  async cargarMap() {
   this.geolocation = await this.obtenerUbiacion()
   this.longitud1 = this.geolocation.coords.longitude;
   this.latitud1 = this.geolocation.coords.latitude;
    const mapa: HTMLElement = document.getElementById('map');
    
    this.map = new google.maps.Map(mapa, {
      center: { lat: this.latitud1, lng: this.longitud1 },
      zoom: 15
    })
    this.directionsRenderer.setMap(this.map)
    const indicacionesHTML: HTMLElement = document.getElementById('indicaciones')
    this.directionsRenderer.setPanel(indicacionesHTML)
    this.marker=new google.maps.Marker({
      position:{
        lat: this.latitud1,
        lng: this.longitud1
      },
      map:this.map,
      title:"tu estas aqui"
    });
  }

  obtenerUbiacion():Promise<any> {
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(resolve,reject)
    })
  }

  async autoCompletado(mapalocal,marcadorlocal){
    var autocomplete: HTMLElement=document.getElementById('autocompletar');
    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo('bounds',this.map);
    this.search=search;

    search.addListener('place_changed',function(){
      var p_place=search.gm_accessors_.place.oj.formattedPrediction
      //console.log(search.getPlace().address_components[6].long_name);
      //p_place = search.getPlace().geometry.location;
      mapalocal.setCenter(this.place);
      mapalocal.setZoom(15);
      console.log(p_place)
      marcadorlocal.setPosition(this.place);
      marcadorlocal.setMap(mapalocal)
    })

  }
  calcularRuta(){

    this.place = this.search.getPlace().geometry.location;
    this.viaje.fin=this.search.gm_accessors_.place.oj.formattedPrediction
    var request = {
      origin: {
        lat: this.latitud1,
        lng: this.longitud1
      },
      destination:this.place,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request,(resultado,status)=>{
      this.directionsRenderer.setDirections(resultado);
    })
    this.marker.setPosition(null);
    
  }

  async viajero(){
    this.viaje.cod = Date.now()
    this.viaje.conductor = this.ruteo
    this.viaje.inicio.latitud = this.latitud1;
    this.viaje.inicio.longitud = this.longitud1;
    this.index = await this.storage.getDatoAuto("autos",this.viaje.auto)
    this.viaje.capasidad = this.cualquiera[this.index].capasidad;
    this.viaje.hora = new Date()
    this.viaje.nombre = await this.storage.getDato("usuario",this.ruteo)
    this.viaje.nombre = this.viaje.nombre.nombre
    console.log(this.viaje.nombre)
    if (this.viaje.capasidad == "" || this.viaje.costo == "" || this.viaje.auto == "") {
      alert("Debe rellenar todos los campos!")
      return
    }else{
      alert("Viaje creado exitosamente!")
      this.storage.agregarViaje("Viaje",this.viaje)
    }
    var aux =await this.storage.getDato('usuario',this.ruteo);
    aux.viaje = this.viaje.cod;
    await this.storage.ModificarDato('usuario',aux);
    this.location.back()

  }


}
