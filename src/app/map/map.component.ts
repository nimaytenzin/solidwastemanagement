import { Component, OnInit } from '@angular/core';
import * as L from  'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper'
 


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  currentPosition = {};
  
  constructor() { }

  ngOnInit(): void {


    var map = new L.Map("map")

    let openmap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> ',
       }).addTo(map);
      
   L.Routing.control({
    waypoints: [
      L.latLng(27.448019, 89.658340),
      L.latLng(27.512344, 89.640979)
    ],
    router: new L.Routing.graphHopper(undefined /* no api key */, {
      serviceUrl: 'https://zhichar.myddns.rocks/gh/route'}),  routeWhileDragging: false,
      // geocoder: L.Control.Geocoder.nominatim({})

  }).addTo(map);

  

    }
}
