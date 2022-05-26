import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { EmptyComponent } from './components/empty/empty.component';
import { GroupedItemComponent } from './components/grouped-item/grouped-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { EmojiRoutingModule } from './emoji-routing.module';
import { EmojiComponent } from './emoji.component';
import { FormatPipe } from './pipe/format.pipe';
import { EmojiService } from './services/emoji.service';
import { TitleComponent } from './components/title/title.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    EmojiComponent,
    ItemComponent,
    SearchBarComponent,
    GroupedItemComponent,
    ItemListComponent,
    EmptyComponent,
    DialogComponent,
    FormatPipe,
    TitleComponent,
    ToggleComponent,
    IconComponent,
  ],
  imports: [
    CommonModule,
    EmojiRoutingModule,
    HttpClientModule,
    MatIconModule,
    ClipboardModule,
    MatSnackBarModule,
    SharedModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatRippleModule,
  ],
  providers: [EmojiService],
})
export class EmojiModule {}
