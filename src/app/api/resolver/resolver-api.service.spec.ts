/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { ResolverApiService } from './resolver-api.service';

import * as faker from 'faker';

describe('ResolverApiService', () => {
  let spectator: SpectatorHttp<ResolverApiService>;
  const createHttp = createHttpFactory({
    service: ResolverApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  const project = 'project-0';
  const us = faker.random.number();
  const issue = faker.random.number();
  const task = faker.random.number();
  const milestone = faker.random.word();
  const wikiPage = faker.random.word();

  it('Resolver by project', () => {

    const queryParams = {
      project,
    };

    spectator.service.project(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by userStory', () => {
    const queryParams = {
      project,
      us: us.toString(),
    };

    spectator.service.userStory(project, us).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by issue', () => {
    const queryParams = {
      project,
      issue: issue.toString(),
    };

    spectator.service.issue(project, issue).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by task', () => {
    const queryParams = {
      project,
      task: task.toString(),
    };

    spectator.service.task(project, task).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by milestone', () => {
    const queryParams = {
      project,
      milestone,
    };

    spectator.service.milestone(project, milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by wikiPage', () => {
    const queryParams = {
      project,
      wikipage: wikiPage,
    };

    spectator.service.wikiPage(project, wikiPage).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by multiple, only one parameter', () => {
    const queryParams = {
      project,
      task: task.toString(),
    };
    spectator.service.multiple(project, task).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by multiple, many parameters', () => {
    const queryParams = {
      project,
      task: task.toString(),
      us: us.toString(),
    };
    spectator.service.multiple(project, task, us).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by Reference', () => {
    const queryParams = {
      project,
      ref: us.toString(),
    };
    spectator.service.ref(project, us).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });
});
