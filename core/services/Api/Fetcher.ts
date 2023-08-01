export default class Fetcher {
  private baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  public get = async (url: string) => {
    return await this.query(url);
  };

  private query = async (url: string, data?: any) => {
    const response = await fetch(`${this.baseUrl}${url}`, {
      next: {
        revalidate: 3000,
      },
    });

    if (!response.ok) throw new Error('post not found');

    return response.json();
  };
}
