import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { StoregeService } from 'src/app/services/storege.service';

declare var google;

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  providers: [NavParams]
})
export class ViajesPage implements OnInit {

  rut:any;
  viajes:any;
  viaje: any ={
    conductor:"1",
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
  final:any;
  usuario:any={
    rut:"",
    correo:"",
    nombre: "",
    fechaNacimiento :"",
    genero:"",
    idlicencia:"",
    pass:"",
    tipo_usuario:"",
    viaje:""
  };
  pase:any={
    rut:"",
    nombre:"",
    pagado:false
  }
  mapa: HTMLElement=document.getElementById('map3');
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  viajesn:number=0;
  


  constructor(private storage:StoregeService,private router:Router,private activatedRoute:ActivatedRoute,public navCtrl: NavController, public navParams: NavParams) { 
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    
  }

  async ngOnInit() {
    
    this.usuario = await this.storage.getDato('usuario',this.rut);
    this.viaje = await this.storage.getDatoViaje('Viaje',this.usuario.viaje);
    this.viajes= await this.storage.getDatos('Viaje');
    if(this.usuario.viaje !=''){
      this.cargarMapa();
      this.calcularRuta();
      }
    if (this.viajes !=undefined){
      this.viajesn = this.viajes.length;
    }
    
  }

  async ionViewWillEnter(){
  
  }

  async ionViewDidEnter(){
    
    
  }

  async cargarMapa() {
    const map: HTMLElement = document.getElementById('map3');
    this.mapa = new google.maps.Map(map, {
      center: { lat: -33.598479343601085, lng: -70.57909245930202 },
      zoom: 1
    })
    this.directionsRenderer.setMap(this.mapa)

  }

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
  this.router.navigate(['/prueba/'],datos)
}

  async subir(cod){
    let aux=await this.storage.getDatoViaje('Viaje',cod)
    this.pase.nombre=this.usuario.nombre;
    this.pase.rut=this.usuario.rut;
    aux.pasajeros.push(this.pase)
    if(aux.pasajeros.length == aux.capasidad){
      aux.isfull = true;
    }
    this.storage.ModificarDatoViaje('Viaje',aux)
    var aux2 =await this.storage.getDato('usuario',this.rut);
    aux2.viaje = cod;
    await this.storage.ModificarDato('usuario',aux2);
    this.viaje = await this.storage.getDatoViaje('Viaje',this.usuario.viaje);
    this.ngOnInit()
  }
 
  
  async calcularRuta() {


    var request = {
      origin: "Duoc UC: Sede Puente Alto - Avenida San Carlos, Puente Alto",
      destination: this.viaje.fin,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (resultado, status) => {
      this.directionsRenderer.setDirections(resultado);
    })

  }

  async pagar(){
    let aux=await this.storage.getDatoViaje('Viaje',this.usuario.viaje)
    var index = aux.pasajeros.findIndex(pasajeros=>pasajeros.rut==this.rut);
    aux.pasajeros[index].pagado = true;
    console.log(aux.pasajeros[index])
    this.storage.ModificarDatoViaje('Viaje',aux)
    
    }


  async bajar(){
    let aux=await this.storage.getDato('usuario',this.usuario.rut);
    let aux2 = await this.storage.getDatoViaje('Viaje',this.usuario.viaje)
    let aux3 = aux2.pasajeros;
    aux3.forEach((value,index)=>{
      if(value.rut == this.usuario.rut){
        aux3.splice(index,1);
      }
    });
    aux.viaje = '';
    this.storage.ModificarDato('usuario',aux);
    this.storage.ModificarDatoViaje('Viaje',aux2);
    this.usuario = await this.storage.getDato('usuario',this.rut);
    this.viaje = await this.storage.getDatoViaje('Viaje',this.usuario.viaje);
    this.ngOnInit()
  }

  async recargar(){
    this.ngOnInit()
  }

}
