import "./lexical.css";

import { $generateNodesFromDOM } from "@lexical/html";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $getRoot } from "lexical";
import { useState } from "react";
import { SettingsContext } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import LexicalAutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CustomOnChangePlugin from "./plugins/CustomOnChangePlugin";
import CustomSuggestionsPlugin from "./plugins/CustomSuggestionsPlugin";
import CustomTextHighlightPlugin from "./plugins/CustomTextHighlightPlugin";
import CustomToolbarPlugin from "./plugins/CustomToolbarPlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
import { TableContext } from "./plugins/TablePlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import LexicalContentEditable from "./ui/ContentEditable";
import Placeholder from "./ui/Placeholder";

type Props = {
  editorContent: string;
  setEditorContent: (editorContent: string) => void;
  isRichText?: boolean;
  placeHolderText?: string;
  maxLength?: number;
  autoFocus?: boolean;
};

function onError(error: Error) {
  console.error(error, "#uyi789798798");
}

/*
TODO: 
- draggable block bug while dragging to top
- position fixed on menu makes it disappear
- pass auto complete options to input / text field & rich text (TypeaheadMenuPlugin)
- like grammarly, highlight word or phrase, click on it, open dialog to modify it (see how they auto format AutoLink)
*/

export default function LexicalEditor({
  editorContent,
  setEditorContent,
  isRichText = true,
  placeHolderText,
  maxLength,
  autoFocus,
}: Props) {
  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    // basically an "editor-entities to classNames" map
    theme: PlaygroundEditorTheme,
    nodes: [...PlaygroundNodes], //  we have to register nodes in `initialConfig` before using them (unless they are included in core-library)
    editorState: (editor) => {
      // html string -> lexical nodes
      const parser = new DOMParser();
      const dom = parser.parseFromString(editorContent, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      // append lexical nodes to root
      const root = $getRoot();
      root.append(...nodes);
    },
    onError,
  };

  const placeholder = placeHolderText ? (
    <Placeholder>{placeHolderText}</Placeholder>
  ) : null;
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport] = useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <SettingsContext>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div
                style={
                  {
                    // all: "initial",
                    // fontFamily: "inherit",
                  }
                }
              >
                <div className="editor-shell">
                  {isRichText ? (
                    <CustomToolbarPlugin
                      setIsLinkEditMode={setIsLinkEditMode}
                    />
                  ) : null}

                  <div
                    className={`editor-container ${
                      !isRichText ? "plain-text" : ""
                    }`}
                  >
                    <HistoryPlugin />

                    <CustomTextHighlightPlugin />

                    <CustomSuggestionsPlugin />

                    <CustomOnChangePlugin setEditorContent={setEditorContent} />
                    {/* try after adding auto-complete context */}
                    {/* <AutocompletePlugin /> */}

                    {typeof maxLength === "number" && (
                      <MaxLengthPlugin maxLength={maxLength} />
                    )}

                    {autoFocus ? <AutoFocusPlugin /> : null}

                    {isRichText ? (
                      <>
                        <ListPlugin />
                        <RichTextPlugin
                          contentEditable={
                            <div className="editor-scroller">
                              <div className="editor" ref={onRef}>
                                <LexicalContentEditable />
                              </div>
                            </div>
                          }
                          placeholder={placeholder}
                          ErrorBoundary={LexicalErrorBoundary}
                        />
                        <LexicalAutoLinkPlugin />
                        <LinkPlugin />
                        {floatingAnchorElem && !isSmallWidthViewport && (
                          <>
                            <DraggableBlockPlugin
                              anchorElem={floatingAnchorElem}
                            />
                            {/* <CodeActionMenuPlugin
                              anchorElem={floatingAnchorElem}
                            /> */}

                            <FloatingLinkEditorPlugin
                              anchorElem={floatingAnchorElem}
                              isLinkEditMode={isLinkEditMode}
                              setIsLinkEditMode={setIsLinkEditMode}
                            />
                            {/* <FloatingTextFormatToolbarPlugin
                              anchorElem={floatingAnchorElem}
                            /> */}
                          </>
                        )}
                      </>
                    ) : (
                      <PlainTextPlugin
                        contentEditable={<LexicalContentEditable />}
                        placeholder={placeholder}
                        ErrorBoundary={LexicalErrorBoundary}
                      />
                    )}
                  </div>
                </div>
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  );
}
