import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrmplateFormComponent } from './trmplate-form.component';

describe('TrmplateFormComponent', () => {
  let component: TrmplateFormComponent;
  let fixture: ComponentFixture<TrmplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrmplateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrmplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
