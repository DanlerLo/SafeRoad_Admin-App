import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeocercasComponent } from './add-geocercas.component';

describe('AddGeocercasComponent', () => {
  let component: AddGeocercasComponent;
  let fixture: ComponentFixture<AddGeocercasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGeocercasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeocercasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
