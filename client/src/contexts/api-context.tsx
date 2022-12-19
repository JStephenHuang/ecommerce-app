import axios, { AxiosInstance } from 'axios';
import { useFirebaseAuthToken } from './firebase-app-context';
import { ListingFormType } from '../types/listing';

class APIClient {
  private client: AxiosInstance;

  constructor(url: string, token: string | null) {
    if (url === '') {
      throw 'APIClientError: url cannot be empty.';
    }

    this.client = axios.create(
      token === null
        ? { baseURL: url, withCredentials: true }
        : {
            baseURL: url,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
    );
  }

  getSchools = async () => {
    return await this.client.get(`/school`);
  };

  getSchool = async (id: string) => {
    return await this.client.get(`/school/${id}`);
  };
  getListings = async () => {
    return await this.client.get(`/listing`);
  };

  getListing = async (id: string) => {
    return await this.client.get(`/listing/${id}`);
  };

  getListingsByType = async (type: string) => {
    return await this.client.get(`/listing/${type}`);
  };

  getUser = async (username: string) => {
    return await this.client.get(`/user/${username}`);
  };

  getUserListings = async (username: string) => {
    return await this.client.get(`/user/listings/${username}`);
  };

  createListing = async (body: ListingFormType) => {
    return await this.client.post(`/listing/publish`, body);
  };
  getCartItems = async (username: string) => {
    const params = {
      username: username,
    };
    return await fetch(`/cart/${params.username}`);
  };
  addCartItem = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    return await this.client.post(`/listing/add-cart/${id}`, body);
  };
  removeCartItem = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    await this.client.post(`/cart/remove/${id}`, body);
  };
  deleteListing = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    await this.client.post(`/listing/delete/${id}`, body);
  };
}
