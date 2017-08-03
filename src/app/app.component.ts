import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sampleList = [];
  sampleSelectedItems = [];
  constructor(){ }

  ngOnInit(){
    this.sampleList = [
      {"id":"1","itemName":"Punjab"},
      {"id":"2","itemName":"Haryana"},
      {"id":"3","itemName":"Himachal Pradesh"},
      {"id":"4","itemName":"Delhi"},
      {"id":"5","itemName":"Rajashtan"},
      {"id":"6","itemName":"UP"},
      {"id":"7","itemName":"Bihar"}];
    
    this.sampleSelectedItems = [
      {"id":"2","itemName":"Haryana"}
    ];
  }
  onItemSelect(item:any){
    console.log(item);
  }
  OnItemDeSelect(item:any){
    console.log(item);
  }
  showModel(){
    
  }
  changeData(){
    
  }
}
