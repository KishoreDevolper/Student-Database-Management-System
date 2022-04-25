import { Component, OnInit } from '@angular/core';
import { AuthentcationService , ToeknPayload } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials :ToeknPayload ={
    id:0,
    first_name:'',
    last_name:'',
    email:'',
    password:'',
  }

  constructor( private auth:AuthentcationService,private router:Router) { }

  register(){
    this.auth.register(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/login')
    },
    err =>{
      console.log(err)
      
    })
  }

  ngOnInit(): void {
  }

}
