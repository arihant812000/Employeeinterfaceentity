import { Component, OnInit,OnChanges,Input,Output,EventEmitter } from '@angular/core';
import{FormBuilder,FormArray,FormGroup, Validators} from '@angular/forms'
import {ApicallService } from '../apicall.service'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnChanges {
  @Input() data:any;
  @Output() submit:EventEmitter<boolean>=new EventEmitter()
public form: FormGroup;

public addressList: FormArray;
      AgeEmp=0;
      maxDate="";
      minDate="";

  constructor( private fb:FormBuilder,private apicall:ApicallService) {
   
   }
dateVali(){
  var now =new Date();
  var min =now.getFullYear()-70;
  var max=now.getFullYear()-18;
  var date=now.getDate().toString()
  var month=now.getMonth().toString()
  if(now.getDate()<10 && now.getMonth()>10){
    date="0"+now.getDate()

  }
  else if(now.getMonth()<10 && now.getDate()>10){
    month="0"+now.getMonth()

  }
  else if(now.getDate()<10 && now.getMonth()<10){
    date="0"+now.getDate()
    month="0"+now.getMonth()
   }
 
  this.maxDate=max+"-"+month+"-"+date;
  this.minDate=min+"-"+month+"-"+date;
  console.log(this.maxDate)
}
  ngOnInit(): void {
    console.log("init",this.data)
    this.form = this.fb.group({
      EmpId:[0],
      First_Name:[null,Validators.compose([Validators.required])],
      Last_Name:[null,Validators.compose([Validators.required])],
      Age:[0,Validators.compose([Validators.required])],
      Date_of_Birth:[null,Validators.compose([Validators.required])],
      Department:["",Validators.compose([Validators.required])],
      Email:[null,Validators.compose([Validators.required])],
      Job_Role:[null,Validators.compose([Validators.required])],
      Phone_No:[null,Validators.compose([Validators.required])],
      EmployeeAddresses : this.fb.array([this.createAddress()])
    });
     this.addressList = this.form.get('EmployeeAddresses') as FormArray;
    this.dateVali();
  }

  ngOnChanges():void{
  console.log("change occored",this.data)
  if(this.addressList!=null && this.data!=null){
    var data=this.addressList.at(0)
this.addressList.clear();
this.addressList.push(data)
  
  
  for (let index = 0; index < this.data.EmployeeAddresses.length-1; index++) {
    this.addressList.push(this.createAddress())
    
  }
  this.data.EmployeeAddresses.forEach(element => {
    console.log(element)
    var str=element.Address_type[0].toUpperCase()+element.Address_type.slice(1)
    if(str=="Permanent"||str=="Office"||str=="Current"){
        element.Addresstype=str
    console.log(element)
    }
    else{
      element.Addresstype="Others"
    }
  
  });
  console.log("data",this.data)
    console.log(this.form)
    this.form.setValue(this.data)
}
else{
  console.log("eslse")
  this.ngOnInit();
 
}
  }
  createAddress(): FormGroup {
    return this.fb.group({
      Addresstype: ["",Validators.compose([Validators.required])],
      Address_type: [""],
      House_number: [null,Validators.compose([Validators.required])],
      Street: [null,Validators.compose([Validators.required])],
      City: [null,Validators.compose([Validators.required])],
      State: [null,Validators.compose([Validators.required])],
      Country: [null,Validators.compose([Validators.required])],
      Pin_Code: [null,Validators.compose([Validators.required])],
      Landmark: [null,Validators.compose([Validators.required])],
      
    });
  }
// add a contact form group
addAddress() {
  this.addressList.push(this.createAddress());
  console.log(this.addressList)
}

// remove contact from group
removeAddress(index) {
  console.log(index)
   this.addressList.removeAt(index);
}
onsubmit(){
  console.log(this.form.value)
  var data=this.form.value
  data.EmployeeAddresses.forEach(element => {
    console.log(element)
    if(element.Address_type==""||element.Address_type==null){
      element.Address_type=element.Addresstype
    }
    console.log(element)
    delete element.Addresstype
  });
  
  if(data.EmpId==0||data.EmpId==null){
     delete data.EmpId
      console.log(data)
    this.apicall.postEmployee(data).subscribe(data=>{
      window.alert(data)
      this.submit.emit(true)
    })
  }
  else{
   var id=data.EmpId
    this.apicall.putEmployee(id,data).subscribe(data=>{
      window.alert(data)
      this.submit.emit(true)
    })
  }
  this.resetValue()
  
}
resetValue(){
  this.ngOnInit()
 this.form.setValue(
   {

   }
 )
}
getAge=(data)=>{
  var date= new Date(data);
  var now= new Date();
console.log("age")

  var age=now.getFullYear()-date.getFullYear();
  if(age<18){
  this.form.controls.Date_of_Birth.setValue(null)
console.log("if")
}
   if((now.getMonth()<date.getMonth())||(now.getMonth()==date.getMonth() && now.getDate()<date.getDate())){
     age--;
   }
 
   this.form.controls.Age.setValue(age)

   
}


}
