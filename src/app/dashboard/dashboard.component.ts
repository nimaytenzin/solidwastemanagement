import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import * as L from 'leaflet';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  username ="nima";
  latitude: number;
  longitude: number;
  accuracy: number;
  private socket: any;
  updateLocation: boolean;
  watchId: any;
  currentLocation: {};
  map: L.Map;
  marker : L.marker;
  myMarker = L.icon({
    iconUrl: 'assets/dump-truck.png',
    iconSize: [30, 30]
  });

  constructor() { 
    
    this.socket = io('http://192.168.6.144:3000'); //objects called in the constructor will be instanciated only once 
    this.updateLocation = false; //a boolean variable based on which the navigation.watchposition will turn on and off
  }

  ngOnInit(): void {
    this.renderMap()
  }

  renderMap(){
    this.map = L.map('map').setView([27.472633, 89.637632], 14);;
    L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}').addTo(this.map);
}
  

startLocation(e){
  
    if(this.updateLocation == false){
      this.updateLocation = true;
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

         this.watchId = navigator.geolocation.watchPosition((position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.accuracy = position.coords.accuracy;
  
          this.socket.emit('location', {
            "lat": this.latitude,
            "long":this.longitude
          })
        
        if(this.marker != undefined){
          this.marker = null;
        } // when the browser creates a new marker object this.marker will be defined as a leaflet marker. so when it happens, destroy the object by assigning it null
        this.marker = L.marker([this.latitude, this.longitude], {icon: this.myMarker}).addTo(this.map)
          .bindPopup('You are here')
          .openPopup();
          this.map.flyTo([ this.latitude,  this.longitude], 14);
          
        });
      }else {
         console.error('No support for geolocation');
      }
      
      this.socket.on('s-emitlocation', msg => {
        console.log("received location from server")
        console.log(msg)
      })  
    }   
  
}

  stopLocation(e){
 if(this.updateLocation == true){
   navigator.geolocation.clearWatch(this.watchId) 
   this.updateLocation = false;
 }
}



}
