import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMecanicoComponent } from './add-Mecanico.component';

describe('AddMecanicoComponent', () => {
  let component: AddMecanicoComponent;
  let fixture: ComponentFixture<AddMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMecanicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
