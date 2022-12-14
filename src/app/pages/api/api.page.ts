import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  datos1:any=[]=[];
  constructor(private api:ApiService) { }

  ngOnInit() {
    let datos = this.api.getData();
    console.log(datos);
    datos.subscribe((data:any) =>{
      console.log(data)
      this.datos1=data;
    });

  }

}
