import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private apiUrl = '/api/deadline';
  constructor(private http: HttpClient) { }
  getDeadline(): Observable<{ secondsLeft: number }> {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching deadline:', error);
        return of({ secondsLeft: 50 }); // Default value or handle accordingly
      })
    );
    return of({ secondsLeft: 50 }); 
  }
}
