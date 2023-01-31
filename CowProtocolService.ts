import axios, { AxiosInstance } from "axios";

class CowProtocolService {
  private axios: AxiosInstance;
  baseURL = "https://api.cow.fi/mainnet/api/v1";

  constructor() {
    this.axios = axios.create({
      baseURL: this.baseURL,
    });
  }

  getOrder = async (orderId: string) => {
    const order = await this.axios.get(`orders/${orderId}`);
    return order;
  };
}

export const cowProtocolService = new CowProtocolService();
