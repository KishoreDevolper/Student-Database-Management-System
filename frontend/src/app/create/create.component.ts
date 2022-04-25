import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-create',
   templateUrl: './create.component.html',
   styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  departmentdata:any;
   constructor(private service:ApiserviceService,private router:ActivatedRoute , http:HttpClient) { }
     errormsg:any;
     successmsg:any;
     getparamid:any;
     
  ngOnInit(): void {
    
     console.log(this.router.snapshot.paramMap.get('id'),'getid');
     this.getparamid=this.router.snapshot.paramMap.get('id')
     this.service.getSingleData(this.getparamid).subscribe((res)=>{
       console.log(res,'res==>')
       this.userForm.patchValue({
         'first_name':res.data[0].first_name,
         'last_name':res.data[0].last_name,
         'date_of_birth':res.data[0].date_of_birth,
         'email_id':res.data[0].email_id,
         'mobile_number':res.data[0].mobile_number,
         'roll_number':res.data[0].roll_number,
         'department':res.data[0].department,
         'year':res.data[0].year,

       })
       
     })
     this.getdepartmentdata()
     }

  get email(){return this.userForm.get('email_id')};
  get mobile(){return this.userForm.get('mobile_number')};
  get roll(){return this.userForm.get('roll_number')};
  get fname(){return this.userForm.get('first_name')};
  get lname(){return this.userForm.get('last_name')};

  userForm=new FormGroup({
  
    'first_name':new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    'last_name':new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    'date_of_birth':new FormControl('',Validators.required),
    'email_id':new FormControl('', [Validators.required,Validators.email ]),
    'mobile_number':new FormControl('',[Validators.required,Validators.minLength(10)]),
    'roll_number':new FormControl('',[Validators.required,Validators.minLength(3)]),
    'department':new FormControl('',[Validators.required,Validators.minLength(3)]),
    'year':new FormControl('',Validators.required)
  });
  userUpdate()
   {
       console.log(this.userForm.value,'updatedform');
       if(this.userForm.valid)
       {
         this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
            console.log(res,'resupdated');
            this.successmsg=res.message
            this.userForm.reset()
         });
       }
       else{
         this.errormsg='all field required';
       }
   }

  userSubmit()
  {
    if(this.userForm.valid)
    {
      console.log(this.userForm.value)
      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.reset();
        alert('data created successfully !!! ');
        
      })
      
    }
  }
  getdepartmentdata()
  {
    this.service.getdepartmentdata().subscribe((res)=>{
      console.log(res,'resdepartment=>');
              this.departmentdata=res.data
    })
  }
  
  }

