import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup , FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-staffcreation',
  templateUrl: './staffcreation.component.html',
  styleUrls: ['./staffcreation.component.css']
})
export class StaffcreationComponent implements OnInit {

  constructor(private apiservice:ApiserviceService,private activateroute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  StaffLoginIDCreation= new FormGroup({
    'email_id':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required,Validators.minLength(6)]),


  })
  get email_id(){return this.StaffLoginIDCreation.get('email_id')};
  get password(){return this.StaffLoginIDCreation.get('password')};
  
  handleSubmit()
  {
    if(this.StaffLoginIDCreation.valid)
    {
      console.log(this.StaffLoginIDCreation.value)
      this.apiservice.staffiddata(this.StaffLoginIDCreation.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.StaffLoginIDCreation.reset();
        alert('data created successfully !!! ');
        
      })
      
    }
  }
}
