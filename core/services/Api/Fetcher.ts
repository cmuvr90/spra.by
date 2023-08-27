const qs = require('qs');
import { FetchResponseStatus, FetchResponseType } from '@/core/types/Fetcher';

export default class Fetcher {
  private readonly baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param url
   * @param params
   * @returns
   */
  public get = async (url: string, params = {}): Promise<FetchResponseType> => {
    const queryParams = params && Object.keys(params).length ? '?' + qs.stringify(params) : '';
    return await this.query(url + queryParams, 'GET');
  };

  /**
   *
   * @param url
   * @param method
   * @param data
   */
  private query = async (url: string, method: string, data?: any): Promise<FetchResponseType> => {
    try {
      console.log('QUERY URL: ', `${this.baseUrl}${url}`);

      const response = await fetch(`${this.baseUrl}${url}`, {
        method,
        next: {
          revalidate: 3000,
        },
      });

      console.log('response = ', JSON.stringify(response, null, 2));

      if (!response.ok) throw new Error('post not found');

      const responseData = await response.json();

      console.log('responseData = ', JSON.stringify(responseData, null, 2));

      if (responseData?.error) throw new Error(responseData.error);

      return {
        data: responseData?.data ?? null,
        status: responseData?.status ?? FetchResponseStatus.SUCCESS,
        error: null,
      };
    } catch (e: any) {
      console.log('ERROR QUERY = ', e);
      return { data: null, error: `${e?.message || e}`, status: FetchResponseStatus.ERROR };
    }
  };
}
