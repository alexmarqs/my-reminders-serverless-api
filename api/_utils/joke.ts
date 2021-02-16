import { httpRequest } from './fetchHelper';
import { dadjokeConfig } from './config';

type DadJoke = {
  joke: string;
};

export async function loadRandomDadJoke() {
  return await httpRequest<DadJoke>(dadjokeConfig.apiUrl, {
    headers: {
      Accept: 'application/json',
      'User-Agent': dadjokeConfig.userAgentName
    }
  });
}
