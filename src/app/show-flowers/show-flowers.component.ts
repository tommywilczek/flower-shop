import { Component, OnInit, forwardRef } from '@angular/core';

import { FlowerService } from '../flowerService/flower.service';
import { Flower } from 'src/models/flower.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-show-flowers',
  templateUrl: './show-flowers.component.html',
  styleUrls: ['./show-flowers.component.css'],
  providers: [
    FlowerService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ShowFlowersComponent)
    }
]
})
export class ShowFlowersComponent implements OnInit {

  flowers: Flower[];
  flower: Flower;
  public toggleIsInEditModeCounter = 0;

  constructor(private flowerService: FlowerService) {
    this.flower = new Flower();
  }

  ngOnInit() {
    this.getFlowers();
    this.toggleIsInEditModeCounter = 0;
  }

  public getFlowers() {
    this.flowerService.getAllFlowers().subscribe(flowers => {
      this.flowers = flowers;
    });
  }

  saveFlower() {
    this.flowerService.saveFlowerInService(this.flower)
      .subscribe(flower => {
        this.flowers.push(flower);
        this.getFlowers();
      });
  }

  toggleEditMode() {
    this.toggleIsInEditModeCounter += 1;
  }

  isInEditMode() {
    if (this.toggleIsInEditModeCounter % 2 === 0) {
      return false;
    } else {
      return true;
    }
  }


}
