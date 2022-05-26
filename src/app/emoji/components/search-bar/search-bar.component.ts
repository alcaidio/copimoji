import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inputSearch') input!: ElementRef;
  @Output() search = new EventEmitter<string>();
  sub!: Subscription;
  @Input() style: any;

  ngAfterViewInit() {
    this.sub = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        tap((value) => this.search.emit(value))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
