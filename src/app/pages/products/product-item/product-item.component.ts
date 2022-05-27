import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() rowData : Product[];
  constructor() { }

  ngOnInit() {
  }

}
