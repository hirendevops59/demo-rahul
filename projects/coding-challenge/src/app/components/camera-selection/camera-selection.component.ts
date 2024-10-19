import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-camera-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-selection.component.html',
  styleUrl: './camera-selection.component.scss'
})
export class CameraSelectionComponent {
  // Desired ranges
  desiredSubjectDistanceRange: [number, number] = [1, 10]; // Software Camera Subject Distance Array: [desiredMinDistance, desiredMaxDistance]
  desiredLightLevelRange: [number, number] = [100, 200]; // Software Camera Light Level Array: [desiredMinLight, desiredMaxLight]

  // Hardware cameras array: [minDistance, maxDistance, minLight, maxLight]
  hardwareCameras: [number, number, number, number][] = [
    [1, 4, 100, 120],  // Camera 1
    [4, 7, 120, 160],  // Camera 2
    [7, 10, 160, 200], // Camera 3
  ];

  // Result variable
  isSufficient: boolean | null = null;

  // Method to check if hardware cameras are sufficient
  checkCameras() {
    this.isSufficient = this.isSoftwareCameraSufficient(
      this.desiredSubjectDistanceRange,
      this.desiredLightLevelRange,
      this.hardwareCameras
    );
  }

  private isSoftwareCameraSufficient(
    desiredSubjectDistanceRange: [number, number],
    desiredLightLevelRange: [number, number],
    hardwareCameras: [number, number, number, number][]
  ): boolean {
    const [desiredMinDistance, desiredMaxDistance] = desiredSubjectDistanceRange;
    const [desiredMinLight, desiredMaxLight] = desiredLightLevelRange;

    // Sort hardware cameras by distance and then light range
    hardwareCameras.sort((a, b) => a[0] - b[0]);
    // Check if distance range is fully covered
    let currentMaxDistance = desiredMinDistance;
    const mapHardwareCamerasDistance = hardwareCameras.map(cam => [cam[0], cam[1]]);
    for (const [camMinDist, camMaxDist] of mapHardwareCamerasDistance) {
      if (camMinDist > currentMaxDistance) {
        return false; // Gap in distance coverage
      }
      currentMaxDistance = Math.max(currentMaxDistance, camMaxDist);
      if (currentMaxDistance >= desiredMaxDistance) {
        break; // Fully covered the distance range
      }
    }
    if (currentMaxDistance < desiredMaxDistance) {
      return false; // Distance not fully covered
    }

    // Now check if light range is fully covered
    hardwareCameras.sort((a, b) => a[2] - b[2]);
    let currentMaxLight = desiredMinLight;
    const mapHardwareCamerasLight = hardwareCameras.map(cam => [cam[2], cam[3]]);
    for (const [camMinLight, camMaxLight] of mapHardwareCamerasLight) {
      if (camMinLight > currentMaxLight) {
        return false; // Gap in light level coverage
      }
      currentMaxLight = Math.max(currentMaxLight, camMaxLight);
      if (currentMaxLight >= desiredMaxLight) {
        break; // Fully covered the light level range
      }
    }
    return currentMaxLight >= desiredMaxLight;
  }
}
