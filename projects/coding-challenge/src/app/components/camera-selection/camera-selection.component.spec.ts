import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraSelectionComponent } from './camera-selection.component';

describe('CameraSelectionComponent', () => {
  let component: CameraSelectionComponent;
  let fixture: ComponentFixture<CameraSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
