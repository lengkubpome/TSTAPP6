import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ProductShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
