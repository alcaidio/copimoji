import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import mixpanel from 'mixpanel-browser';
import { BehaviorSubject } from 'rxjs';
import { CanonicalService } from './shared/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private titleMeta: Title,
    private meta: Meta,
    private canonical: CanonicalService
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    mixpanel.init('cd3e6ce3d5e006b591a1131c876b4ed5', { debug: true });
    mixpanel.track('Homepage');
  }

  ngOnInit(): void {
    this.canonical.createCanonicalLink();
    this.titleMeta.setTitle('Copimoji - Find an amoji');

    this.meta.addTags([
      {
        name: 'description',
        content:
          'Copimoji is the best way to quickly find an emoji, no need to struggle anymore, all emojis you need are listed !',
      },
      {
        name: 'keywords',
        content: 'Emojis, svg, symboles',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Timothy Alcaide' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' },
    ]);
  }
}
