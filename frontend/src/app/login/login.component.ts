import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentcationService , ToeknPayload } from '../authentication.service';
@Component({
   selector: 'app-create',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  credentials :ToeknPayload ={
    id:0,
    first_name:'',
    last_name:'',
    email:'',
    password:'',
  }

     loginForm: any=FormGroup;
         responseMessage:any;
         readData:any;
         data:any;
         staffForm:any;
        err:any;
        
        employeelogin:any 
         constructor(private formBuilder : FormBuilder, private Router:ActivatedRoute,
   
        private http:HttpClient,
        private loginservice:LoginService,
        private router:Router,  
        private apiservice:ApiserviceService,
        private auth:AuthentcationService,) { }
        login(){
          this.auth.login(this.credentials).subscribe(()=>{
            this.router.navigateByUrl('/read')
            this.employeelogin
          },
          err =>{
            console.log(err)
            alert("invalid username or password")
            
            
          })
        }
     
  ngOnInit(): void {
    this.loginForm= this.formBuilder.group
    ({
      roll_number:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.nullValidator]],
      date_of_birth:['',[Validators.required]]
    })
    this.staffForm=this.formBuilder.group({
      email_id:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]]
    })
    
  } 
  get roll_number(){return this.loginForm.get('roll_number')};
  get date_of_birth(){return this.loginForm.get('date_of_birth')};
  get email_id(){return this.staffForm.get('email_id')};
  get password(){return this.staffForm.get('password')};
  
  staffsubmit(){{
    var formData = this.staffForm.value
    var data ={
      email_id: formData.email_id,
      password:formData.password
    }
    var id ={ }
    console.log("data", data,"\n",id)
    let value= this.apiservice.staffone(data)
    value.subscribe((res)=>
    {
    let respData = JSON.parse(JSON.stringify(res))
    this.router.navigate(['/display'],res)
    this.router.navigate(['/read',],{
    queryParams:
        {
          id:respData .data[0].id,
        }
   })
  })
this.staffForm.reset()
}}

  handleSubmit(){
    
    var formData= this.loginForm.value;
    var data ={
         roll_number: formData.roll_number,
         date_of_birth: formData.date_of_birth
    }
    var id ={ }
  //      console.log("data", data,"\n id", id )
  //          this.apiservice.getOne(data,id).subscribe((res)=>{
  //            let respData = JSON.parse(JSON.stringify(res))
  //            console.log("res", respData)
  //          this.readData= respData.data;
  // //  var id={} 
    console.log("data")
    if(this.apiservice.getOne(data,id)){
      let value = this.apiservice.getOne(data,id)
          value.subscribe((abc)=>{{
          console.log("welcome",data)
          let sepData = JSON.parse(JSON.stringify(abc))

         this.router.navigate(['/display'],abc)
          this.router.navigate(['/student',],{
          queryParams:{
          id:sepData.data[0].id,
          }
       
      })
          
    }
   })
  
    }
    else{
      console.log("invalid user data")
    }
  
  }
    

  }

