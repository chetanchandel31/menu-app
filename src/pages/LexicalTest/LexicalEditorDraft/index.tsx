import { $generateNodesFromDOM } from "@lexical/html";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { useTheme } from "@mui/material";
import { $getRoot } from "lexical";
import LexicalCustomPluginOnChange from "./LexicalCustomPlugins/LexicalCustomPluginOnChange";
import LexicalCustomPluginToolbar from "./LexicalCustomPlugins/LexicalCustomPluginToolbar";

type Props = {
  editorContent: string;
  setEditorContent: (editorContent: string) => void;
};

/*
TODO:
- can use inline styles to customize?
- can read active state of selection? bold, italic etc?
- pass auto complete options to input / text field & rich text (TypeaheadMenuPlugin)
- highlight text that matches certain strings??? eg highlight {{contact.email}} in red (see how they auto format AutoLink)
- like grammarly, highlight word or phrase, click on it, open dialog to modify it (see how they auto format AutoLink)
*/

function onError(error: Error) {
  console.error(error, "#uyi789798798");
}

export default function LexicalEditorDraft({
  editorContent,
  setEditorContent,
}: Props) {
  const theme = useTheme();

  /* each instance's state(editor state) has 
  1. tree of instances of lexical nodes (in lexical, a node is a class that encapsulates functionality (eg: 
     rendering the html tag to editor etc) related to an element (eg: heading, paragraph etc))
  2. selection (total 3 types: range, grid and node selection)
  */

  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme: {
      // basically an "editor-entities to classNames" map
    },
    //  we have to register nodes in `initialConfig` before using them (unless they are included in core-library (not sure what that means))
    nodes: [HeadingNode, ListNode, ListItemNode],
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

  /*
   - we can register commands and command handlers
   - we can dispatch commands with payload, via button clicks or on DOM events
   - command handlers usually call editor.update(() => {...}) to update the state, then lexical core package updates the DOM
   */

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* plugins are 
      1. react components, children for lexical composer
      2. for extending editor's capabilities */}
      <LexicalCustomPluginToolbar />
      {/* <LexicalCustomPluginBanner /> */}

      <div style={{ position: "relative" }}>
        {/* plain text plugin: registers command handlers to update the editor */}
        {/* <PlainTextPlugin
          contentEditable={
            // ContentEditable is the div with `contentEditable`
            <ContentEditable
              style={{
                height: 200,
                width: "100%",
                padding: theme.spacing(0, 1),
                border: `solid 1px ${theme.palette.text.primary}`,
              }}
            />
          }
          placeholder={
            <div
              style={{
                position: "absolute",
                left: theme.spacing(1),
                top: theme.spacing(2),
              }}
            >
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        /> */}

        {/* rich text plugin: registers command handlers to update the editor, also has command listeners for bold, italic etc (eg ctrl + b) */}
        <RichTextPlugin
          contentEditable={
            // ContentEditable is the div with `contentEditable`
            <ContentEditable
              style={{
                minHeight: 200,
                width: "100%",
                padding: theme.spacing(0, 1),
                border: `solid 1px ${theme.palette.text.primary}`,
              }}
            />
          }
          placeholder={
            <div
              style={{
                position: "absolute",
                left: theme.spacing(1),
                top: theme.spacing(2),
              }}
            >
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      {/* ListPlugin: has command listeners for inserting list, removing list etc */}
      <ListPlugin />

      {/* undo and redo capabilities */}
      <HistoryPlugin />

      <LexicalCustomPluginOnChange setEditorContent={setEditorContent} />
    </LexicalComposer>
  );
}
