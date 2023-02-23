import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.scss']
})
export class BaselineComponent implements OnDestroy {

  protected ngUnsubscribe: Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

}
