import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-skeleton-loader',
  imports: [],
  templateUrl: './skeleton-loader.html',
  styleUrl: './skeleton-loader.css',
})
export class SkeletonLoader {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
}
