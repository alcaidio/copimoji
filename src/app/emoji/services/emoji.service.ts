import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  share,
  shareReplay,
} from 'rxjs';
import { convertMapToArray, groupBy } from 'src/app/utils/utils';
import { Emoji, EmojisGroup, SkinToneType } from '../emoji.model';
import { StorageService } from './storage.service';

export const DEFAULT_TONE: SkinToneType = 0;

@Injectable()
export class EmojiService {
  private emojis$ = this.http
    .get<Emoji[]>('assets/data/emoji.json')
    .pipe(shareReplay(1));

  tones$ = this.http.get<Emoji[]>('assets/data/tone.json').pipe(shareReplay(1));

  tags$ = this.emojis$.pipe(
    map((emojis) =>
      emojis.map((emoji) =>
        emoji.tags.split(', ').filter((e: string) => e.length > 2)
      )
    ),
    map((arr) => arr.reduce((acc, curr) => acc.concat(curr))),
    map((arr) => Array.from(new Set(arr)))
  );

  private groups$ = this.emojis$.pipe(
    map((emojis) => emojis.map((emoji) => emoji.group)),
    map((arr) => Array.from(new Set(arr)))
  );

  groupsFormatted$ = this.groups$.pipe(
    map((groups) => groups.map((g) => g.replace('-', ' ')))
  );

  private textFilter$ = new BehaviorSubject<string>('');

  filteredEmojis$ = combineLatest([this.emojis$, this.textFilter$]).pipe(
    map(([emojis, text]) => {
      if (!text.length) return emojis;
      return emojis.filter((e: Emoji) => {
        const t = text.toLowerCase();
        const textInAnnotation = e.annotation.toLowerCase().includes(t);
        const textInTags = e.tags.toLowerCase().includes(t);

        return textInAnnotation || textInTags;
      });
    }),
    shareReplay(1)
  ) as Observable<Emoji[]>;

  hasSearch$ = this.textFilter$.pipe(
    map((f) => f.length > 0),
    share()
  );

  emojisGrouped$: Observable<EmojisGroup> = this.filteredEmojis$.pipe(
    map((emojis) => groupBy(emojis, (emoji: Emoji) => emoji.group)),
    map((m) => convertMapToArray(m))
  );

  emojisSubGrouped$: Observable<EmojisGroup> = this.emojis$.pipe(
    map((emojis) => groupBy(emojis, (emoji: Emoji) => emoji.subgroups)),
    map((m) => convertMapToArray(m))
  );

  private tone = new BehaviorSubject<SkinToneType>(DEFAULT_TONE);
  tone$ = this.tone.asObservable();

  constructor(private http: HttpClient, private localStorage: StorageService) {}

  onChangeTone(tone: SkinToneType) {
    this.tone.next(tone);
  }

  onTextSearch(value: string) {
    this.textFilter$.next(value.toLowerCase());
  }
}
