import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import L, { Layer, Map, control } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Marker } from './core/models/marker.model';
import { MapService } from './core/services/map.service';
import { MarkersService } from './core/services/markers.service';
import { baseTiles } from './utils/baseTiles';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'leaflet';

  map!: Map;
  layerChooser!: L.Control.Layers;
  markers!: Layer[];

  constructor(
    private mapService: MapService,
    private markersService: MarkersService
  ) { }

  ngAfterViewInit(): void {
    this.InitMap();
    /** 
     * Questa funzione permette di centrare la mappa sulla posizione dell'utente
     * Aggiunge anche un marker sulla posizione dell'utente, di colore e forma diversa
     * */
    this.locateUser();
  }

  private InitMap(): void {
    const status = this.mapService.currentStatus;
    this.map = new Map('map', {
      center: status.center,
      zoom: status.zoom,
      layers: baseTiles[status.baseLayer] ? [baseTiles[status.baseLayer]] : [baseTiles['Open Street Map']],
    });

    this.layerChooser = control.layers(baseTiles, status.overlay).addTo(this.map);
    this.AddMarkers();
  }

  private locateUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.map.setView([latitude, longitude], 13);
        L.circle(
          [latitude, longitude],
          {
            radius: 1000,
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
          }
        ).addTo(this.map)
          .bindPopup('Ti trovi qui').openPopup();
      }, () => {
        alert('Non è stato possibile ottenere la tua posizione');
      });
    } else {
      alert('Geolocalizzazione non supportata dal tuo browser');
    }
  }

  private AddMarkers(): void {
    this.markersService.getMarkers().subscribe(markers => {
      this.markers = markers.map((marker: Marker) => {
        if (marker.location)
          return L.marker(marker.location).bindPopup('<strong>' + marker.name + '</strong>' + '<br>' + marker.description);
        else return L.marker([0, 0]);
      });
      /**
       * questo codice permette di aggiungere al layerChooser, e richiede l'attivazione manuale di Markers
       * this.layerChooser.addOverlay(L.layerGroup(this.markers), 'Markers');
       */
      L.layerGroup(this.markers).addTo(this.map); // questo permette di aggiungere i marker direttamente alla mappa
    });
  }
}
