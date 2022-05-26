import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Emoji } from '../../emoji.model';
import { EmojItemSize } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {
  @Input() emojis?: Emoji[] | null;
  @Input() isGrid = false;
  @Input() clickable = true;
  @Input() noPadding = false;
  @Input() size?: EmojItemSize;
  @Output() details = new EventEmitter<Emoji>();

  trackByEmoji(index: number, emoji: Emoji): string {
    return emoji.emoji + emoji.order;
  }
}
