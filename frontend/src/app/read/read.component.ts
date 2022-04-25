import { Component, OnInit } from '@angular/core';
import{ ApiserviceService } from '../apiservice.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  readData:any;
  successmsg:any;
  searchText:any;
  first_name:any;
  getparamid:any;
  
  constructor(private service:ApiserviceService,private activatedRoute:ActivatedRoute) { }
   
   ngOnInit(): void {
     
    console.log(this.activatedRoute.snapshot.queryParamMap.get("id"),"getid");
    this.getparamid=this.activatedRoute.snapshot.queryParamMap.get("id")
    console.log("data",this.getparamid)      
    
    this.service.getAllData().subscribe((res)=>{
     console.log("read rs",res)
    this.readData=res.data
console.log("data",this.getparamid)      
    
    

  })
   }  
    
    
}
