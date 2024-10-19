import { Routes } from '@angular/router';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CameraSelectionComponent } from './components/camera-selection/camera-selection.component';

export const routes: Routes = [
    { path: '', redirectTo: 'countdown-timer', pathMatch: 'full' }, 
    { path: 'countdown-timer', component: CountdownComponent },
    { path: 'camera-selection', component: CameraSelectionComponent },
];
