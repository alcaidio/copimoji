import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage.service';
import { Emoji } from '../../emoji.model';

export type EmojItemSize = 'S' | 'L';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() emoji!: Emoji;
  @Input() clickable = true;
  @Input() size?: EmojItemSize;
  @Output() details = new EventEmitter<Emoji>();

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private localStorage: StorageService
  ) {}

  onAction(emoji: Emoji, evt: MouseEvent) {
    if (evt.ctrlKey || evt.metaKey || !this.clickable) {
      this.copy(emoji);
    } else {
      this.details.emit(emoji);
    }
  }

  private copy(emoji: Emoji) {
    this.clipboard.copy(emoji.emoji);
    this.snackBar.open(`${emoji.emoji} copied in the clipboard!`, '', {
      duration: 2000,
    });
    this.localStorage.push('emojis', emoji);
  }
}
