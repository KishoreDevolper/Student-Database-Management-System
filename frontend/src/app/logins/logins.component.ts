import { Component, OnInit } from '@angular/core';
import { AuthentcationService, ToeknPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {
  credentials :ToeknPayload ={
    id:0,
    first_name:'',
    last_name:'',
    email:'',
    password:'',
  }

  constructor( private auth:AuthentcationService,private router:Router) { }

  login(){
    this.auth.login(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/read')
    },
    err =>{
      console.log(err)
      alert("invalid user id")
    })
  }

  ngOnInit(): void {
  }

}
