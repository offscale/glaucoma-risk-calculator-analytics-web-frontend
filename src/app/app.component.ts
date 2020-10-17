import { Component } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openedSubject = new Subject<boolean>();

  dismissSidebar(): void {
    this.openedSubject.next(false);
  }
}
