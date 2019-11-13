import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() row: number;
  @Input() column: number;

  constructor() {
    // console.log('cell ctor', this.row, this.column);
  }

  ngOnInit() {
    // console.log('cell ngOnInit', this.row, this.column);
  }

  selectCell() {
    console.warn('cell selected: ', this.row, this.column);
  }
}
