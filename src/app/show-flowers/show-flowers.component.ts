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

  constructor(private flowerService: FlowerService) {
    this.flower = new Flower();
  }

  ngOnInit() {
    this.getFlowers();
  }

  public getFlowers() {
    this.flowerService.getAllFlowers().subscribe(flowers => {
      this.flowers = flowers;
    });
  }

  saveFlower() {
    console.log(this.flower.name, this.flower.inStock, this.flower.petals, this.flower.scent);
    this.flowerService.saveFlowerInService(this.flower);
  }


}
