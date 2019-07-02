import { Component, OnInit } from '@angular/core';

import { FlowerService } from '../flowerService/flower.service';
import { Flower } from 'src/models/flower.model';

@Component({
  selector: 'app-show-flowers',
  templateUrl: './show-flowers.component.html',
  styleUrls: ['./show-flowers.component.css'],
  providers: [FlowerService]
})
export class ShowFlowersComponent implements OnInit {

  flowers: Flower[];

  constructor(private flowerService: FlowerService) { }

  ngOnInit() {
    this.getFlowers();
  }

  public getFlowers() {
    this.flowerService.getAllFlowers().subscribe(flowers => {
      this.flowers = flowers;
    });
  }

}
