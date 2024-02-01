/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export default function dropDownActiveClass(active: boolean) {
  if (active) return 'active dropdown-item-active';
  else return '';
}
