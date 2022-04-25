import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
public value1:any;
public value2:any;
public value3:any;
getparamid:any;
readData:any
id:any

constructor(private activateRouter :ActivatedRoute, private apiservice:ApiserviceService) { }

  ngOnInit(): void {
        console.log(this.activateRouter.snapshot.paramMap.get('id'),'getid');
        this.getparamid=this.activateRouter.snapshot.paramMap.get('id')
        this.apiservice.markone(this.getparamid).subscribe((res)=>{
        console.log(res,"res==>")
        this.readData=res.data
        this.id=res.id
  })

  
}


}
