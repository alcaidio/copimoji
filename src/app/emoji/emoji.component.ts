import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { urlFormat } from '../utils/utils';
import { DialogComponent } from './components/dialog/dialog.component';
import { Emoji, EmojisGroup, SkinToneType } from './emoji.model';
import { EmojiService } from './services/emoji.service';
import { StorageService } from './services/storage.service';

@Component({
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmojiComponent implements OnInit {
  isGrid = false;
  emojisGroup$!: Observable<EmojisGroup>;
  emojis$!: Observable<Emoji[] | null>;
  tags$?: Observable<string[]>;
  hasSearch$?: Observable<boolean>;
  groupsFormatted$?: Observable<string[]>;
  groupsControl = new FormControl();
  tones$?: Observable<Emoji[]>;
  tone$?: Observable<SkinToneType>;
  tonesControl = new FormControl();
  hasDialog = false;
  private destroy$ = new Subject<void>();
  private isSmallScreen =
    this.breakpointObserver.isMatched('(max-width: 599px)');

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: EmojiService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    public localStorage: StorageService
  ) {}

  ngOnInit(): void {
    this.hasSearch$ = this.service.hasSearch$;
    this.tags$ = this.service.tags$;
    this.emojisGroup$ = this.service.emojisGrouped$;
    this.emojis$ = this.service.filteredEmojis$;
    this.groupsFormatted$ = this.service.groupsFormatted$;
    this.tones$ = this.service.tones$;
    this.tone$ = this.service.tone$;

    this.route.queryParams
      .pipe(
        filter((params) => params['emoji'] && !this.hasDialog),
        map((params) => params['emoji']),
        switchMap((e) => {
          return this.service.filteredEmojis$.pipe(
            map((emojis) =>
              emojis?.find((em) => em.annotation.toLowerCase() === e)
            ),
            filter((emoji) => !!emoji),
            tap((emoji) => this.openDialog(emoji as Emoji))
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(text: string) {
    this.service.onTextSearch(text);
  }

  onChangeTemplate() {
    this.isGrid = !this.isGrid;
  }

  onSelectChange(evt: any) {
    this.service.onChangeTone(evt.target.value);
  }

  openDialog(emoji: Emoji): void {
    const params = this.isSmallScreen
      ? {
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'full-screen-modal',
        }
      : {
          maxHeight: '80vh',
        };

    const dialog = this.dialog.open(DialogComponent, {
      data: {
        emoji,
      },
      maxWidth: '100vw',
      ...params,
    });

    dialog
      .afterOpened()
      .pipe(
        tap(() => {
          this.hasDialog = true;
          this.appendQueryParams({ emoji: urlFormat(emoji.annotation) });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    dialog
      .afterClosed()
      .pipe(
        tap(() => {
          this.hasDialog = false;
          this.appendQueryParams({ emoji: null });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private appendQueryParams(queryParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
