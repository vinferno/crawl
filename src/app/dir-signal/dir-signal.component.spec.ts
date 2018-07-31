import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirSignalComponent } from './dir-signal.component';

describe('DirSignalComponent', () => {
  let component: DirSignalComponent;
  let fixture: ComponentFixture<DirSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
