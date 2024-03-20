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
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  private map!: Map;
  private layerChooser!: L.Control.Layers;
  private markers!: Layer[];
  private searchedMarker!: Layer;

  address: string = '';

  constructor(
    private mapService: MapService,
    private markersService: MarkersService
  ) { }

  ngAfterViewInit(): void {
    this.InitMap();
    /** 
     * Questa funzione permette di centrare la mappa sulla posizione dell'utente
     * aggiungendo un marker circolare su di essa
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
        alert('Non è stato possibile ottenere la tua posizione. Prova a riavviare il browser e concedere i permessi di geolocalizzazione');
      });
    } else {
      alert('Geolocalizzazione non supportata dal tuo browser');
    }
  }

  private AddMarkers(): void {
    this.markersService.getMarkers().subscribe({
      next: (markers: Marker[]) => {
        this.markers = markers.map((marker: Marker) => {
          if (marker.location)
            return L.marker(marker.location).bindPopup('<strong>' + marker.name + '</strong>' + '<br>' + marker.description);
          else return L.marker([0, 0]);
        });
        /**
         * questo codice permette di aggiungere i markers al layerChooser, ma richiede l'attivazione manuale del livello per permetterne la visualizzazione
         * this.layerChooser.addOverlay(L.layerGroup(this.markers), 'Markers');
         */
        L.layerGroup(this.markers).addTo(this.map); // questo permette di aggiungere i marker direttamente alla mappe
      },
      error: (error) => {
        console.error("Errore: ", error);
      },
    });
  }

  getMarkerByAddress(address: string): void {
    this.markersService.getMarkerByAddress(address).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          if (this.searchedMarker) this.map.removeLayer(this.searchedMarker);
          this.searchedMarker = L.marker([res[0].lat, res[0].lon]);
          this.map.addLayer(this.searchedMarker);
          this.map.setView([res[0].lat, res[0].lon], 16);
        } else {
          alert('Indirizzo non trovato');
        }
      },
      error: (error) => {
        console.error("Errore: ", error);
      }
    });
  }
}
