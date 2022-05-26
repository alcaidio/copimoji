import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Emoji } from '../../emoji.model';

@Component({
  selector: 'app-grouped-item',
  templateUrl: './grouped-item.component.html',
  styleUrls: ['./grouped-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedItemComponent {
  @Input() groups!: any | null; // EmojisGroup
  @Output() details = new EventEmitter<Emoji>();
}
