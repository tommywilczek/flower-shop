import { Component, OnInit } from '@angular/core';
import { Flower } from '../../models/flower.model';

@Component({
  selector: 'app-create-flower',
  templateUrl: './create-flower.component.html',
  styleUrls: ['./create-flower.component.css']
})
export class CreateFlowerComponent implements OnInit {

  public flower: Flower;

  constructor() {
    // this.flower = new Flower();
  }

  ngOnInit() {
  }

  saveFlower() {
    // console.log('saving: ', this.flower);
    return;
  }
}
