import fetch from 'node-fetch';

const API_KEY = '23567b218376f79d9415'; // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035';

let token = '';

export async function getPictures(page: number = 1): Array<Object> {
  const data = await request(`${API_ENDPOINT}/images?page=${page}`);

  return data.pictures;
}

export async function getPictureDetails(id: number): Object {
  const data = await request(`${API_ENDPOINT}/images/${id}`);

  return data;
}

export async function request(url: string, options: Object = {}): Object {
  if (!token) {
    token = await getToken();
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

export async function getToken(): string {
  const result = await fetch(`${API_ENDPOINT}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: API_KEY }),
  });
  const body = await result.json();

  return body.token;
}
