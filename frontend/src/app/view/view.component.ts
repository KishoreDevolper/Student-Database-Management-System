import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {  
    id:any;
    data:any;
    first_name:any;
    last_name:any;
    date_of_birth:any;
    email_id:any;
    mobile_number:any;
    roll_number:any;
    department:any;
    year:any;

  constructor(private service:ApiserviceService,private activateRouter:ActivatedRoute ,
     http:HttpClient,
     private router:Router) { }
     errormsg:any;
     readData:any;
     sucessmsg:any;
     getparamid:any;
     
ngOnInit(): void {

  console.log(this.activateRouter.snapshot.paramMap.get('id'),'getid');
 this.getparamid=this.activateRouter.snapshot.paramMap.get('id')
 this.service.getSingleData(this.getparamid).subscribe((res)=>{
   console.log(res,'res==>')
   this.readData=res.data
   })
 
 
      }
      
 getoneData()
    {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,"res==>");
        this.readData=res.data;
    
        
      });
    }
    deleteID (id:any)
    
           
    {
      console.log(id,'deleteid==>');
     this.service.deleteData(id).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.getoneData();
      this.router.navigate(['/read'])
        });
}

      // getOne(){
      //      this.service.getOne(this.id).subscribe(data=>{
      //        this.data=data;
      //        console.log(this.data)
            
      //      });
      // }
      



      }
    
