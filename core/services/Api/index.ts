import Fetcher from './Fetcher';

export default class Api {
  private fetcher;
  public navigation;
  public products;
  public collections;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.fetcher = new Fetcher({ baseUrl });
    this.navigation = {
      main: this.navigationMainMenu,
    };
    this.products = {
      get: this.getProducts,
    };
    this.collections = {
      get: this.getCollections,
    };
  }

  /**
   *
   * @returns
   */
  private navigationMainMenu = () => {
    return this.fetcher.get('/navigations/main');
  };

  /**
   *
   * @param handle
   * @returns
   */
  private getCollections = (handle: string) => {
    return this.fetcher.get(`/collections/${handle}`);
  };

  /**
   *
   * @returns
   */
  private getProducts = (params: any) => {
    return this.fetcher.get(`/products`, params);
  };
}
