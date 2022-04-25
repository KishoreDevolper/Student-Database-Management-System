import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  getparamid:any;
  readData:any;
  data:any;
  res:any;
  readstudentData:any;
  constructor(private http:HttpClient,private activateroute:ActivatedRoute, private router:Router, private apiservice:ApiserviceService) { }

  ngOnInit(): void {
    console.log(this.activateroute.snapshot.queryParamMap.get("id"),"getid");
    this.getparamid=this.activateroute.snapshot.queryParamMap.get("id")
    console.log("data",this.getparamid)      
    this.apiservice.getsingle(this.getparamid).subscribe((res)=>{
     console.log("read rs",res)
    this.readData=res.data

})
    console.log(this.activateroute.snapshot.paramMap.get("id"),"getid");
    this.getparamid=this.activateroute.snapshot.paramMap.get("id")
    console.log("data",this.getparamid)      
    this.apiservice.getsingle(this.getparamid).subscribe((res)=>{
    console.log("read rs",res)
    this.readstudentData=res.data

})
}
}