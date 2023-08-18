const qs = require('qs');

export default class Fetcher {
  private baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param url
   * @returns
   */
  public get = async (url: string, params = {}): Promise<Response> => {
    return await this.query(url + '?' + qs.stringify(params));
  };

  /**
   *
   * @param url
   * @param data
   * @returns
   */
  private query = async (url: string, data?: any): Promise<Response> => {
    console.log('URL =', `${this.baseUrl}${url}`);
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        next: {
          revalidate: 3000,
        },
      });

      if (!response.ok) throw new Error('post not found');

      return response.json();
    } catch (e: any) {
      return { error: `${e?.message || e}`, status: 'error' };
    }
  };

  /**
   *
   * @param data
   * @returns {string}
   */
  private getParams = (params: any) => {
    const queryString = Object.keys(params)
      .map((key) => {
        if (typeof params[key] === 'object') {
          return encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key]));
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');

    return queryString;

    /*    let values = [];
    for (let key in data)
      if (data.hasOwnProperty(key) && data[key] !== null) values.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    return values.length > 0 ? '?' + values.join('&') : ''; */
  };
}

type Response = {
  data?: any;
  status: 'error' | 'success';
  error?: string;
};
