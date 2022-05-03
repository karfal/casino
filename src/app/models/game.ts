interface GameThumb {
  title: string;
  url: string;
}

export interface Game {
  id: string;
  title: string;
  providerName: string;
  startUrl: string;
  tag: string;

  thumb?: GameThumb;
  hide?: boolean;
}
