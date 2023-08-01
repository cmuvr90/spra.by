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
  public get = async (url: string): Promise<Response> => {
    return await this.query(url);
  };

  /**
   *
   * @param url
   * @param data
   * @returns
   */
  private query = async (url: string, data?: any): Promise<Response> => {
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
}

type Response = {
  data?: any;
  status: 'error' | 'success';
  error?: string;
};
