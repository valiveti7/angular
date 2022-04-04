import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent implements OnInit {

  formValue!: FormGroup
  restaurantModelObj:RestaurantData= new RestaurantData;
  allRestaurantData:any
  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
// Now Subscibing our data which is maped via services..
addresto(){
  this.restaurantModelObj.name=this.formValue.value.name;
  this.restaurantModelObj.email=this.formValue.value.email;
  this.restaurantModelObj.mobile=this.formValue.value.mobile;
  this.restaurantModelObj.address=this.formValue.value.address;
  this.restaurantModelObj.services=this.formValue.value.services;
  this.api.postRestaurant(this.restaurantModelObj).subscribe((res: any)=>{
    console.log(res);
    alert('Restaurant Records added Successful');
    this.formValue.reset()
    this.getAllData()
  },
    (  err: any) =>{
    alert('Check subscribe code')
  
  })
}
// get all data
getAllData(){
  this.api.getrestaurant().subscribe((res: any)=>{
    this.allRestaurantData=res;
})}

// delete records
deleteResto(data:any){
  this.api.deleterestaurant(data.id).subscribe(res=>{
    alert("Restaurant Records Deleted ")
    this.getAllData()
  })
}
onEditResto(data:any){
  this.restaurantModelObj.id=data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);

}
onUpdateResto(data:any){
  this.restaurantModelObj.name=this.formValue.value.name;
  this.restaurantModelObj.email=this.formValue.value.email;
  this.restaurantModelObj.mobile=this.formValue.value.mobile;
  this.restaurantModelObj.address=this.formValue.value.address;
  this.restaurantModelObj.services=this.formValue.value.services;

  this.api.updaterestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
    alert("Restaurant Records Updated")
    let ref=document.getElementById('clear');
    ref?.click();
    this.formValue.reset();
    this.getAllData();})
  }
}
