import Fetcher from './Fetcher';

export default class Api {
  private fetcher;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.fetcher = new Fetcher({ baseUrl });
  }

  public getMainMenu = () => {
    return this.fetcher.get('/navigations/main');
  };
}
