import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerRegistro } from './ver-registro';

describe('VerRegistro', () => {
  let component: VerRegistro;
  let fixture: ComponentFixture<VerRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerRegistro],
    }).compileComponents();

    fixture = TestBed.createComponent(VerRegistro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
