import { Component, OnInit,Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnChanges{
@Input() data:any
  constructor() { }
  ngOnInit(): void{
    console.log("init details emp")
  }
ngOnChanges(){
  console.log("changede",this.data)
}

}
