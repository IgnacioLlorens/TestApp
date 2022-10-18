import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormsModule} from '@angular/forms';
import { ToastController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validadores } from 'src/app/services/validadores';
import { StoregeService } from 'src/app/services/storege.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  alumno = new FormGroup({
    rut : new FormControl({value: ' ', disabled:false},[Validators.required,Validators.pattern('[0-9]{7,8}-[0-9Kk]{1}'),validadores.ruteo]),
    correo : new FormControl('',[Validators.required,Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    nombre : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(50),validadores.dobleespacio,validadores.whitespaceValidator]),
    fechaNacimiento : new FormControl('',[Validators.required,validadores.menor17]),
    genero : new FormControl('',[Validators.required]),
    idlicencia : new FormControl('',[Validators.pattern('[0-9]{9}')]),
    pass : new FormControl('',[Validators.required]),
    tipo_usuario :new FormControl("pasejero"),
    viaje :new FormControl("")
  });
  
  usuarios: any=[];

  pass2:string;

  constructor(private usuarioService: UsuarioService,private router:Router,private alertController : AlertController,private storage:StoregeService) { }

  async ngOnInit() {
    this.usuarios =await this.storage.getDatos('usuario')
  }

 registrar(){
  if(this.alumno.controls.pass.value != this.pass2){
    alert("contarseña incorrecta");
    return;
  }
  var registrado:boolean = this.usuarioService.agregarUsuario(this.alumno.value);
  if(registrado == true){
  alert("alumno registrado");
  this.alumno.reset();
  this.pass2 = '';
  }
  else{
    alert("usuario existente");
  }
 }

   async eliminar(rut){
    await this.storage.EliminarDato('usuario',rut);
    this.usuarios =await this.storage.getDatos('usuario')
  }

  async buscar(rut){
    var encontrado =await this.storage.getDato('usuario',rut);
    this.alumno.setValue(encontrado);
    this.pass2=encontrado.pass;
  }
  async modificar(){
    await this.storage.ModificarDato('usuario',this.alumno.value)
    this.usuarios =await this.storage.getDatos('usuario')
    this.pass2 =""
  }
  limpiar(){
    this.alumno.setValue({
      rut :'',
      correo:'',
      nombre:'',
      fechaNacimiento:'',
      genero:'',
      idlicencia:'',
      pass:'',
      tipo_usuario:'',
      viaje:''

    })
    this.pass2 = '';
  }

  alerta(){
    alert("Usuario Eliminado!")
  }

  async presentAlert(rut) {
    const alert = await this.alertController.create({
      header: 'Eliminara permanentemente a este usuario!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (ELIMINAR) => {
            this.eliminar(rut);
            this.alerta();
            
          },
        },
      ],
    });
    await alert.present();

}




}
