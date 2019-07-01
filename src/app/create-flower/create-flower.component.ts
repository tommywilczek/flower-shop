import { Component, OnInit, forwardRef } from '@angular/core';
import { Flower } from '../../models/flower.model';
import { FlowerService } from '../flowerService/flower.service';
import { FlowerRepository } from 'src/repositories/flower.repository';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-create-flower',
  templateUrl: './create-flower.component.html',
  styleUrls: ['./create-flower.component.css'],
  providers: [
    FlowerService,
    FlowerRepository,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CreateFlowerComponent)
    }
  ]
})
export class CreateFlowerComponent implements OnInit {

  public flower: Flower;

  constructor(private flowerService: FlowerService) {
    this.flower = new Flower();
  }

  ngOnInit() {
    // this.flower = new Flower();
  }

  saveFlower() {
    console.log(this.flower.name, this.flower.inStock, this.flower.petals, this.flower.scent);
    this.flowerService.saveFlowerInService(this.flower);
  }
}
