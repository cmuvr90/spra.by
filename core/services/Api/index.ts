import Fetcher from './Fetcher';
import { FetchResponseStatus } from '@/core/types/Fetcher';
import Collection from '@/core/types/Collection';
import { MainMenu } from '@/core/types/Navigation';
import { ProductInterface } from '@/core/types';

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
      get: this.getCollection,
    };
  }

  /**
   *
   * @returns
   */
  private navigationMainMenu = async (): Promise<{
    data: MainMenu[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const { data, status, error } = await this.fetcher.get('/navigations/main');
    return { data, status, error };
  };

  /**
   *
   * @param handle
   * @returns
   */
  private getCollection = async (handle: string): Promise<{
    data: Collection,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const { data, status, error } = await this.fetcher.get(`/collections/${handle}`);
    return { data, status, error };
  };

  /**
   *
   * @returns
   */
  private getProducts = async (params: any): Promise<{
    data: ProductInterface[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const { data, status, error } = await this.fetcher.get(`/products`, params);
    return { data, status, error };
  };
}
