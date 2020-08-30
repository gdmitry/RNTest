import fetch from 'node-fetch';
import { HiResImage, Picture, PicturesResponse } from '../types/api';

const API_KEY = '23567b218376f79d9415'; // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035';

let token = '';

export async function getPictures(page = 1): Promise<Picture[]> {
  const data = (await service.request(
    `${API_ENDPOINT}/images?page=${page}`
  )) as PicturesResponse;
  return data.pictures;
}

export async function getPictureDetails(id: string): Promise<HiResImage> {
  const data = (await service.request(
    `${API_ENDPOINT}/images/${id}`
  )) as HiResImage;
  return data;
}

export async function request(
  url: string,
  options = {}
): Promise<{}> {
  if (!token) {
    token = await service.getToken();
  }

  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await fetch(url, params);
  const body = await result.json();

  if (body.status === 'Unauthorized') {
    token = '';
    return request(url, params);
  }

  return body;
}

export async function getToken(): Promise<string> {
  const result = await fetch(`${API_ENDPOINT}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: API_KEY }),
  });
  const body = await result.json();

  return body.token;
}

const service = {
  getPictures,
  getToken,
  getPictureDetails,
  request,
};

export default service;
