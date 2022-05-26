export interface Emoji {
  emoji: string;
  hexcode: string;
  group: string;
  subgroups: string;
  annotation: string;
  tags: string;
  openmoji_tags: string;
  unicode: number;
  order: number;
  skins: Emoji[];
  date?: number;
}

export type SkinToneType = 0 | 1 | 2 | 3 | 4 | 5;

export interface Filters {
  text: string;
  tags: string[];
  groups: string[];
}

interface Group<T> {
  key: string;
  values: Array<T>;
}

export type EmojisGroup = Group<Emoji>[];
