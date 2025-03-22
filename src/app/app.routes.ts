import { Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LiveComponent} from '../live-view/live.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'live', component: LiveComponent},
];
