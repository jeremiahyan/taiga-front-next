/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

module.exports = {
  'plugins': [
    require('postcss-import')({
      from: "/src/styles.css"
    }),
    require('postcss-mixins'),
    require('postcss-color-mod-function'),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
}
