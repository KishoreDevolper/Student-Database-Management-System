import { Component, OnInit , Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-marky',
  templateUrl: './marky.component.html',
  styleUrls: ['./marky.component.css']
})
export class MarkyComponent implements OnInit{

  
  
  
  constructor(private http:HttpClient,private route:Router,private activateRouter:ActivatedRoute ,private apiservice:ApiserviceService) { 
  
  }

  ngOnChanges(changes: SimpleChanges): void {

    
    
    console.log(SimpleChange)
    const markvalue = changes['markvalue'];
    if(markvalue.currentValue > 36 ){
      this.is_passed="pass";
    }else{
      this.is_passed="fail"
    }
  }
  getparamid:any;
  readData:any;
  getsubjectData:any;
  returnresult:any;

  public mark : any;
  public is_passed: any;
  public percentage:any;
  

  set(){
    if(this.mark>35){
      this.percentage=this.mark+"%";
      this.is_passed="pass"
    }
    else{
      this.percentage=this.mark+"%"
      this.is_passed="fail"
    }
  }

  ngOnInit(): void {
    console.log(this.activateRouter.snapshot.paramMap.get('id'),'getid');
    this.getparamid=this.activateRouter.snapshot.paramMap.get('id')
    this.apiservice.getSingleData(this.getparamid).subscribe((res)=>{
      console.log("kishore",res)
      this.MarkyForm.patchValue({
        'student_id':res.data[0].id,
        
        })
    })
    this.apiservice.markone(this.getparamid).subscribe((res)=>{
      console.log("res==>",res)
      
      this.readData=res.data
      this.MarkyForm.patchValue({
        'student_id':res.data[0].student_id,
        
        })
     

  })
  this.SubjectData()
  
  }
  MarkyForm=new FormGroup({
    'is_passed':new FormControl('',Validators.required),
    'subject_name':new FormControl('',Validators.required),
    'mark':new FormControl('',Validators.required),
    'percentage':new FormControl('', Validators.required),
    'student_id':new FormControl('',Validators.required),
 })

SubjectData()
  {
    this.apiservice.SubjectData().subscribe((res)=>{
      console.log(res,'resdepartment=>');
              this.getsubjectData=res.data
    })
  }
  MarkSubmit()
  {
      console.log(this.MarkyForm.value)
      this.apiservice.creatmarkdata(this.MarkyForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.MarkyForm.reset();
        alert('data created successfully !!! ');
        let currentUrl = this.route.url;
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate([currentUrl]);
        
      })
      
  }


  

}
