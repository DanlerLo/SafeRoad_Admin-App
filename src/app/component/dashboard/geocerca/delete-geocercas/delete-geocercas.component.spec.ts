import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGeocercasComponent } from './delete-geocercas.component';

describe('DeleteGeocercasComponent', () => {
  let component: DeleteGeocercasComponent;
  let fixture: ComponentFixture<DeleteGeocercasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGeocercasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGeocercasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
