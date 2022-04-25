import {  Injectable } from "@angular/core"
import{ HttpClient} from'@angular/common/http'
import { map } from "rxjs"
import { Router } from "@angular/router"
import { Observable , of } from "rxjs"

export interface userDetails{
    id:number
    first_name:string
    last_name:string
    email:string
    password:string
    exp:number
    iat:number
    
}

interface TokenResponse{
    token:string
}

export interface ToeknPayload {
    id:number
    first_name:string
    last_name:string
    email:string
    password:string
    
}
@Injectable()
export class AuthentcationService{
    private token : any 

    constructor(private http:HttpClient,private router:Router){}
    apiUrl='http://localhost:3009/users/register';
    apiUrl1='http://localhost:3009/users/login';
    private saveToken(token:string):void{
        localStorage.setItem('userToken',token)
        this.token=token
    }
    private getToken():string{
        if(!this.token){
            this.token=localStorage.getItem('userToken')
        }
        return this.token
    }
public getUserDetails():userDetails{
    const token = this.getToken()
    let Payload
    if(token){
        Payload = token.split('.')[1]
        Payload = window.atob(Payload)
        return JSON.parse(Payload)
    }else {
        return null as any
    }
}
public isLoggedIn():boolean{
    const user = this.getUserDetails()
    if(user){
        return user.exp > Date.now()/1000
    }else{
        return false
    }
}

public register(user:ToeknPayload):Observable<any>
{
    const base= this.http.post<any>(this.apiUrl,user)
    const request=base.pipe(map((data:TokenResponse)=>{
       if(data.token){
           this.saveToken(data.token)
       }
       return data
   })
   )
   return request
   
    
}
public login(user:ToeknPayload):Observable<any>
{
    const base = this.http.post<any>(this.apiUrl1,user)
    console.log("hlo",user)
    console.log("yes",this.apiUrl1)
    const request = base.pipe(
        map((data:TokenResponse)=>{
            if(data.token){
                this.saveToken(data.token)
            }
            return data
        })
    )
    return request
}


// public login(user:ToeknPayload):Observable<any>
// {
//     return this.http.post<any>(this.apiUrl1,user).pipe(
//         map((data:TokenResponse)=>{
//             if(data.token){
//                 this.saveToken(data.token)
//             }
//             return data
//         })
//     )

// }
public profile():Observable<any>
{
    return this.http.get('/users/profile',{
        headers:{Authorization:`${this.getToken()}`}
    })
}
public logout():void{
    this.token=''
    window.localStorage.removeItem('userToken')
    this.router.navigateByUrl('/')
}
}
