import { Component, OnInit } from '@angular/core';
import { Flower } from '../../models/flower.model';
import { FlowerService } from '../flowerService/flower.service';
import { FlowerRepository } from 'src/repositories/flower.repository';

@Component({
  selector: 'app-create-flower',
  templateUrl: './create-flower.component.html',
  styleUrls: ['./create-flower.component.css'],
  providers: [FlowerService, FlowerRepository]
})
export class CreateFlowerComponent implements OnInit {

  public flower: Flower;

  constructor(private flowerService: FlowerService) {
    // this.flower = new Flower();
  }

  ngOnInit() {
  }

  saveFlower() {
    this.flowerService.saveFlowerInService(this.flower);
    return;
  }
}
