import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SLoader } from './service/sc-angular-loader';

@Component({
  selector: 'sc-angular-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sc-angular-loader.html',
  styleUrls: ['./sc-angular-loader.css'],
})
export class ScAngularLoader {
  @Input() type: 'spinner' | 'dots' | 'bar' | 'classic' | 'skeleton' = 'spinner';
  @Input() class: string = 'spinner';
  @Input() color: string = '#3f51b5';
  @Input() background: string = 'rgba(0,0,0,0.2)';
  @Input() width: string = '40px';
  @Input() height: string = '40px';
  @Input() bgBar: string = '#ddd';
  @Input() name: string = 'Loading...';
  constructor(public loaderService: SLoader) {}
}
