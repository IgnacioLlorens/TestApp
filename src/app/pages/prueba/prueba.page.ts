import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StoregeService } from 'src/app/services/storege.service';

declare var google;

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {

  viaje: any = {};
  cod: any = 0;
  final: any;
  rut: any;
  mapa: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private router: Router, private geo: Geolocation, private storage: StoregeService) { }

  async ngOnInit() {

    this.final = this.router.getCurrentNavigation().extras.state.fin;
    this.rut = this.router.getCurrentNavigation().extras.state.rut;
    this.cod = await this.router.getCurrentNavigation().extras.state.cod;
    this.viaje = await this.storage.getDatoViaje('Viaje', this.cod)


    console.log(this.final, this.rut, this.cod, this.viaje.value)
    this.cargarMapa()
    this.calcularRuta()

  }



  cargarMapa() {
    const map: HTMLElement = document.getElementById('map');
    this.mapa = new google.maps.Map(map, {
      center: { lat: -33.598479343601085, lng: -70.57909245930202 },
      zoom: 1
    })
    this.directionsRenderer.setMap(this.mapa)

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
}
