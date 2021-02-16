import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export async function httpRequest<T>(
  request: RequestInfo,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(request, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
