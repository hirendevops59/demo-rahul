import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeadlineService } from '../../services/deadline.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  providers: [ DeadlineService],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy  {
  secondsLeft: number = 0;
  private subscription!: Subscription;
  private worker: Worker | undefined;
  constructor(private deadlineService: DeadlineService) { }
  ngOnInit(): void {
    /*Variation 1*/
    this.subscription = this.deadlineService.getDeadline().subscribe((data: any) => {
      this.secondsLeft = data.secondsLeft;
      this.startCountdown(data.secondsLeft);
    });
  }
  private startCountdown(initialSeconds: number): void {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../../web-workers/countdown.worker.ts', import.meta.url));
      // Send the initial seconds to the worker
      this.worker.postMessage(initialSeconds);
      // Listen for messages from the worker
      this.worker.onmessage = ({ data }) => {
        this.secondsLeft = data; // Update the seconds left based on worker's response
      };
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Safe unsubscribe
    this.worker?.terminate(); 
  }
}
