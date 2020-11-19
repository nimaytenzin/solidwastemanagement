import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client'


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

  constructor() { 
    this.socket = io('http://localhost:3000');
    
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.watchPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.accuracy = position.coords.accuracy;
        
      });
    }else {
       console.error('No support for geolocation');
    }
  }

  startLocation(e){
    this.socket.emit('location', 
      {
        "lat": this.latitude,
        "long":this.longitude
      }
      )

    this.socket.on('s-emitlocation', msg => {
      console.log(msg)
    })

    console.log(this.latitude,this.longitude);
    
}

}
