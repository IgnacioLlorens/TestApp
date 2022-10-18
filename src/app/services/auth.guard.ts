import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StoregeService } from './storege.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router ,private storage:StoregeService){

  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    var isauth: any = this.storage.getAuth();
    if(!isauth){
      this.router.navigate(['/login']);

    }else{
      return true;
    }
    
  }
  
}
