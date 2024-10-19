import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownComponent } from './countdown.component';
import { DeadlineService } from '../../services/deadline.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subscription } from 'rxjs';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;
  let deadlineServiceMock: jasmine.SpyObj<DeadlineService>;
  let mockWorker: Worker;

  beforeEach(async () => {
    deadlineServiceMock = jasmine.createSpyObj('DeadlineService', ['getDeadline']);
    await TestBed.configureTestingModule({
      declarations: [], 
      imports: [CountdownComponent, CommonModule, HttpClientTestingModule],
      providers: [
        { provide: DeadlineService, useValue: deadlineServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;

    // Mocking the worker
    mockWorker = {
      postMessage: jasmine.createSpy('postMessage'),
      terminate: jasmine.createSpy('terminate'),
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      dispatchEvent: jasmine.createSpy('dispatchEvent'),
      onmessage: null,
      onmessageerror: null,
      onerror: null,
    } as unknown as Worker;

    spyOn(window, 'Worker').and.returnValue(mockWorker);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "deadline has passed" if secondsLeft is 0', () => {
    component.secondsLeft = 0;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('The deadline has passed.');
  });

  it('should unsubscribe from DeadlineService on destroy', () => {
    const mockSubscription = jasmine.createSpyObj<Subscription>('Subscription', ['unsubscribe']);
    component['subscription'] = mockSubscription;

    component.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });

});
