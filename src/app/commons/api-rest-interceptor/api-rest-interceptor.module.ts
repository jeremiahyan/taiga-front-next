/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiRestInterceptorService } from './api-rest-interceptor.service';
import { LocalStorageModule } from '../local-storage/local-storage.module';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiRestInterceptorService, multi: true },
  ],
  declarations: [],
  imports: [
    LocalStorageModule,
  ],
})
export class ApiRestInterceptorModule { }
