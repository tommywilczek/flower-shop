import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlowersComponent } from './show-flowers.component';
import { FlowerService } from './../flowerService/flower.service';

describe('ShowFlowersComponent', () => {
  let component: ShowFlowersComponent;
  let fixture: ComponentFixture<ShowFlowersComponent>;

  let flowerService: FlowerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFlowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFlowersComponent);
    component = fixture.componentInstance;
    flowerService = new FlowerService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a list of flowers asynchronously', (done: DoneFn) => {
    flowerService.getAllFlowers().subscribe({
      next: (flowersArray: FlowerService[]) => {
        expect(flowersArray).toBeTruthy();
        done();
      }
    });
  });
});
