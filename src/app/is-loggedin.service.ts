import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedinService implements CanActivate{

  constructor(private router: Router) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

 var loggedIn = sessionStorage.getItem("isLoggedIn");

 if(loggedIn=="true"){
  return true;
 }else {
  return this.router.parseUrl('/unauthorized');
 }

}

}
