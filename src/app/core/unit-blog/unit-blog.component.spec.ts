import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnitBlogComponent } from './unit-blog.component';

describe('UnitBlogComponent', () => {
  let component: UnitBlogComponent;
  let fixture: ComponentFixture<UnitBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitBlogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
