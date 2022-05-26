import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatPipe } from './pipes/format.pipe';
import { TitlePipe } from './pipes/title.pipe';

@NgModule({
  declarations: [TitlePipe, FormatPipe],
  imports: [CommonModule],
  exports: [TitlePipe, FormatPipe],
})
export class SharedModule {}
