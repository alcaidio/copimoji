import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'format' })
export class FormatPipe implements PipeTransform {
  transform(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).split('-').join(' ');
  }
}
