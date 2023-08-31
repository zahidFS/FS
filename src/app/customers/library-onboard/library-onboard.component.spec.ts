import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryOnboardComponent } from './library-onboard.component';

describe('LibraryOnboardComponent', () => {
  let component: LibraryOnboardComponent;
  let fixture: ComponentFixture<LibraryOnboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryOnboardComponent]
    });
    fixture = TestBed.createComponent(LibraryOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
