import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteusuarioComponent } from './delete-usuarios.component';

describe('DeleteUsuariosComponent', () => {
  let component: DeleteusuarioComponent;
  let fixture: ComponentFixture<DeleteusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
