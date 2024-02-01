/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_NORMAL,
  KEY_MODIFIER_COMMAND,
  LexicalEditor,
} from "lexical";
import * as React from "react";
import { sanitizeUrl } from "../../utils/url";

const IS_MAC = navigator.platform.indexOf("Mac") > -1;

export default function InsertLink({
  isEditable,
  isLink,
  activeEditor,
  setIsLinkEditMode,
}: {
  activeEditor: LexicalEditor;
  isEditable: boolean;
  isLink: boolean;
  setIsLinkEditMode: React.Dispatch<boolean>;
}) {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          let url: string | null;
          if (!isLink) {
            setIsLinkEditMode(true);
            url = sanitizeUrl("https://");
          } else {
            setIsLinkEditMode(false);
            url = null;
          }
          return activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [activeEditor, isLink, setIsLinkEditMode]);

  const insertLink = React.useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink, setIsLinkEditMode]);

  return (
    <button
      disabled={!isEditable}
      onClick={insertLink}
      className={"toolbar-item spaced " + (isLink ? "active" : "")}
      aria-label="Insert link"
      title={IS_MAC ? "Insert link (⌘K)" : "Insert link (Ctrl+K)"}
      type="button"
    >
      <i className="format link" />
    </button>
  );
}
