/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TgLoadingComponent } from './loading.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<TgLoadingComponent>;
  const createComponent = createComponentFactory(TgLoadingComponent);

  beforeEach(() => spectator = createComponent({
    detectChanges: false,
  }));

  it('should have a success class by default', () => {
    expect(spectator.query('div')).toHaveClass('loading');
  });
});
