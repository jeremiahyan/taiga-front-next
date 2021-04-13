import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import faker from 'faker';
import { ApplicationsApiService } from './applications-api.service';

describe('ApplicationsApiService', () => {
  let spectator: SpectatorHttp<ApplicationsApiService>;

  const createHttp = createHttpFactory({
    service: ApplicationsApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get', () => {
    const tokenId = faker.random.alphaNumeric();
    spectator.service.get(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/applications/${tokenId}`, HttpMethod.GET);
  });

  it('getToken', () => {
    const tokenId = faker.random.alphaNumeric();
    spectator.service.getToken(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/applications/${tokenId}/token`, HttpMethod.GET);
  });
});
