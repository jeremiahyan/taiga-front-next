/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {

  constructor() { }

  public getEnvironment() {
    return environment;
  }
}
