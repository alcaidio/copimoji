import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: any): string {
    if (search) {
      const pattern = search
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
        .split(' ')
        .filter((t: any) => {
          return t.length > 0;
        })
        .join('|');

      const regex = new RegExp(pattern, 'gi');

      return text.replace(
        regex,
        (match) => `<span class="highlight">${match}</span>`
      );
    } else {
      return text;
    }
  }
}
