import { Routes } from '@angular/router';
import { MapComponent } from "./map/map.component";

export const routes: Routes = [
  //D: automatically redirects to map from default URL
  { path: '', redirectTo: 'map', pathMatch: 'full'},
  { path: 'map', component: MapComponent },
];
