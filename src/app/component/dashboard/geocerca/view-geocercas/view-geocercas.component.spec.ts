import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGeocercasComponent } from './view-geocercas.component';

describe('ViewGeocercasComponent', () => {
  let component: ViewGeocercasComponent;
  let fixture: ComponentFixture<ViewGeocercasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGeocercasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGeocercasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
