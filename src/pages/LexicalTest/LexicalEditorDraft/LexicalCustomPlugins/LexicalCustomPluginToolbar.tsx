import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { Button } from "@mui/material";
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { INSERT_BANNER_COMMAND } from "../LexicalCustomNodes/LexicalCustomNodeBanner";

function LexicalCustomPluginInsertHeading() {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    editor.update(() => {
      // react hooks can't be used outside functional components
      // same way these $ functions can not be used outside such callbacks
      const root = $getRoot();

      const createdHeadingNode = $createHeadingNode("h1");
      const createdTextNode = $createTextNode("Plugin test");

      root.append(createdHeadingNode.append(createdTextNode));
    });
  };

  return (
    <Button onClick={onClick} sx={{ mr: 1 }} variant="contained">
      Insert heading
    </Button>
  );
}

function LexicalCustomPluginHeading() {
  const [editor] = useLexicalComposerContext();

  const onClick = (headingTag: HeadingTagType) => {
    editor.update(() => {
      // react hooks can't be used outside functional components
      // same way these $ functions can not be used outside such callbacks
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        // `$setBlocksType`: helper to change block type of all selected nodes,
        // to the block type returned by our callback

        // `setBlocksType` doesn't work with `node selection`, so check for the type of selection
        $setBlocksType(selection, () => $createHeadingNode(headingTag));
      }
    });
  };

  return (
    <>
      {(["h1", "h2", "h3"] as const).map((headingTag) => (
        <Button
          key={headingTag}
          onClick={() => onClick(headingTag)}
          sx={{ mr: 1 }}
          variant="contained"
        >
          {headingTag}
        </Button>
      ))}
    </>
  );
}

function LexicalCustomPluginLists() {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <Button
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        sx={{ mr: 1 }}
        variant="contained"
      >
        ol
      </Button>

      <Button
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        sx={{ mr: 1 }}
        variant="contained"
      >
        ul
      </Button>
    </>
  );
}

export default function LexicalCustomPluginToolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <LexicalCustomPluginHeading />
      <LexicalCustomPluginInsertHeading />
      <LexicalCustomPluginLists />
      <Button
        onClick={() => editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined)}
        sx={{ mr: 1 }}
        variant="contained"
      >
        Banner
      </Button>
    </>
  );
}
