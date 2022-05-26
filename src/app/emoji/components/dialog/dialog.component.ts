import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { urlFormat } from 'src/app/utils/utils';
import { Emoji } from '../../emoji.model';
import { EmojiService } from '../../services/emoji.service';

export interface DialogData {
  emoji: Emoji;
}

@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  displayEmoji?: Emoji;
  relatedEmojis$: Observable<Emoji[] | undefined>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private service: EmojiService,
    private router: Router,
    private meta: Meta,
    private titleMeta: Title
  ) {
    this.relatedEmojis$ = this.service.emojisSubGrouped$.pipe(
      map((group) =>
        group
          .find((item) => item.key === this.displayEmoji?.subgroups)
          ?.values.filter((v) => v.hexcode !== this.displayEmoji?.hexcode)
      )
    );
  }

  ngOnInit(): void {
    const { emoji } = this.data;

    this.displayEmoji = emoji;

    this.titleMeta.setTitle(
      `Copimoji - ${emoji.annotation} emoji ${emoji.emoji}`
    );

    this.meta.updateTag({
      name: 'description',
      content: `${
        emoji.emoji + ' ' + emoji.annotation
      } emoji, is part of the group "${emoji.group}" and subgroup "${
        emoji.subgroups
      }".`,
    });

    this.meta.updateTag({
      name: 'keywords',
      content: emoji.tags,
    });
  }

  onChangeEmoji(emoji: Emoji) {
    this.displayEmoji = emoji;
    this.appendQueryParams({ emoji: urlFormat(emoji.annotation) });
  }

  onCopyHexcode(value: string) {
    this.clipboard.copy(value);
    this.snackBar.open(`"${value}" copied in the clipboard!`, '', {
      duration: 2000,
    });
  }

  // TODO put duplicate from emoji.component in a service
  private appendQueryParams(queryParams: any): void {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
