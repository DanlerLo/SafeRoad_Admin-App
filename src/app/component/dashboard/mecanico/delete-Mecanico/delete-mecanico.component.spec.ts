import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMecanicoComponent } from './delete-mecanico.component';

describe('DeleteMecanicoComponent', () => {
  let component: DeleteMecanicoComponent;
  let fixture: ComponentFixture<DeleteMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMecanicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
