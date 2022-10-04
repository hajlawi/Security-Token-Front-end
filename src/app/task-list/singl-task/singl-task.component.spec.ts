import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglTaskComponent } from './singl-task.component';

describe('SinglTaskComponent', () => {
  let component: SinglTaskComponent;
  let fixture: ComponentFixture<SinglTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
