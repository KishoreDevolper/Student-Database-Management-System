import { Injectable } from "@angular/core";

import { Router , CanActivate } from "@angular/router";
import { AuthentcationService } from "./authentication.service";

@Injectable()
    export class AuthGuardService implements CanActivate {
        constructor( private auth:AuthentcationService, private router:Router){}
        


     canActivate(){
         if(!this.auth.isLoggedIn()){
             this.router.navigateByUrl('/')
             return false
         }
         return true
     }       
        

    }
