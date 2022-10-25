import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  alumno = new FormGroup({
    correo : new FormControl('',[Validators.required,Validators.pattern("[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl")])
  });

  constructor() { }

  ngOnInit() {
  }

}
