import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements AfterViewInit, OnDestroy {
  isToggle = false;

  @ViewChild('toggle') togleEl!: ElementRef;
  @Output() toggle = new EventEmitter<string>();
  sub!: Subscription;

  ngAfterViewInit() {
    this.sub = fromEvent(this.togleEl.nativeElement, 'click')
      .pipe(
        tap(() => {
          this.onToggle();
          this.toggle.emit();
        })
      )
      .subscribe();
  }

  onToggle() {
    this.isToggle = !this.isToggle;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
