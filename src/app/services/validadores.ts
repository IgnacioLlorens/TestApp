import{AbstractControl, ControlConfig}from '@angular/forms'


function dv(T){
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';}

export class validadores{

static menor18(control:AbstractControl){
    var birthdate = control.value;
    var age: number;
    
    var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
    age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    const value = age;
    if(value < 18){
        return{menor18 : true};
    }
    return null;
}

static menor17(control:AbstractControl){
    var birthdate = control.value;
    var age: number;
    
    var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
    age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    const value = age;
    if(value < 17){
        return{menor18 : true};
    }
    return null;
}

static ruteo(control:AbstractControl){
    
        var tmp = control.value.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == 'K') digv = 'k';
        if((dv(rut) != digv )){
            return{ruteo:true};
        };
        
    return null;
}

static whitespaceValidator(form: AbstractControl) {
    return form.value.startsWith(" ") ? {whitespace: true} : null;
  }
  
static dobleespacio(control: AbstractControl){
  const isMultipleSpaces = (control.value || '').match('  ')
  if(isMultipleSpaces=='  '){
      return{dobleespacio:true};
  }
  return null;

}


}

