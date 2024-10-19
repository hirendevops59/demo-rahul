import { TestBed } from '@angular/core/testing';

import { DeadlineService } from './deadline.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DeadlineService', () => {
  let service: DeadlineService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [DeadlineService] // Provide the service
    });
    service = TestBed.inject(DeadlineService); // Inject the service
    httpMock = TestBed.inject(HttpTestingController); // Inject the HttpTestingController
  });
  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding requests
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch the deadline', () => {
    const mockResponse = { secondsLeft: 100 };

    service.getDeadline().subscribe(response => {
      expect(response.secondsLeft).toBe(100); // Check the response
    });

    // Simulate the HTTP request and respond with mock data
    const req = httpMock.expectOne('/api/deadline');
    expect(req.request.method).toBe('GET'); // Ensure the request is a GET
    req.flush(mockResponse); // Provide the mock response
  });

  it('should return default value on error', () => {
    service.getDeadline().subscribe(response => {
      expect(response.secondsLeft).toBe(50); // Check the default error response
    });

    // Simulate the HTTP request and respond with an error
    const req = httpMock.expectOne('/api/deadline');
    expect(req.request.method).toBe('GET'); // Ensure the request is a GET
    req.error(new ErrorEvent('Network error')); // Simulate a network error
  });
});
