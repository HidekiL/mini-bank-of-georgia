import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bg-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
  }

}
