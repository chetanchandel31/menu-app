/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {$isDecoratorBlockNode} from '@lexical/react/LexicalDecoratorBlockNode';
import {$isHeadingNode, $isQuoteNode} from '@lexical/rich-text';
import {$getNearestBlockElementAncestorOrThrow} from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
} from 'lexical';
import * as React from 'react';

import dropDownActiveClass from '../helpers/dropDownActiveClass';
import DropDown, {DropDownItem} from './../../../ui/DropDown';

export default function AdditionalFormattingDropdown({
  activeEditor,
  isSubscript,
  isSuperscript,
  isStrikethrough,
  isEditable,
}: {
  activeEditor: LexicalEditor;
  isSubscript: boolean;
  isSuperscript: boolean;
  isStrikethrough: boolean;
  isEditable: boolean;
}) {
  const clearFormatting = React.useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            // Use a separate variable to ensure TS does not lose the refinement
            let textNode = node;
            if (idx === 0 && anchor.offset !== 0) {
              textNode = textNode.splitText(anchor.offset)[1] || textNode;
            }
            if (idx === nodes.length - 1) {
              textNode = textNode.splitText(focus.offset)[0] || textNode;
            }

            if (textNode.__style !== '') {
              textNode.setStyle('');
            }
            if (textNode.__format !== 0) {
              textNode.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(textNode).setFormat('');
            }
            node = textNode;
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat('');
          }
        });
      }
    });
  }, [activeEditor]);

  return (
    <DropDown
      disabled={!isEditable}
      buttonClassName="toolbar-item spaced"
      buttonLabel=""
      buttonAriaLabel="Formatting options for additional text styles"
      buttonIconClassName="icon dropdown-more">
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'item ' + dropDownActiveClass(isStrikethrough)}
        title="Strikethrough"
        aria-label="Format text with a strikethrough">
        <i className="icon strikethrough" />
        <span className="text">Strikethrough</span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
        }}
        className={'item ' + dropDownActiveClass(isSubscript)}
        title="Subscript"
        aria-label="Format text with a subscript">
        <i className="icon subscript" />
        <span className="text">Subscript</span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
        }}
        className={'item ' + dropDownActiveClass(isSuperscript)}
        title="Superscript"
        aria-label="Format text with a superscript">
        <i className="icon superscript" />
        <span className="text">Superscript</span>
      </DropDownItem>
      <DropDownItem
        onClick={clearFormatting}
        className="item"
        title="Clear text formatting"
        aria-label="Clear all text formatting">
        <i className="icon clear" />
        <span className="text">Clear Formatting</span>
      </DropDownItem>
    </DropDown>
  );
}
