import { useLexicalTextEntity } from "@lexical/react/useLexicalTextEntity";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect } from "react";
import {
  $createCustomTextHighlightNode,
  CustomTextHighlightNode,
} from "../nodes/CustomTextHighlightNode";
import { TextNode } from "lexical";

type Props = {};

export const PLACEHOLDER_REGEX = /{{\s*([a-zA-Z0-9_.]+)\s*}}/;

export default function CustomTextHighlightPlugin({}: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([CustomTextHighlightNode])) {
      throw new Error(
        "CustomTextHighlightNode: CustomTextHighlightNode not registered on editor"
      );
    }
  }, [editor]);

  // these `useCallback`s are quite important, w/o these some useEffect inside `useLexicalTextEntity`
  // will run things on each render and editor will keep grabbing focus at each render
  const getMatch = useCallback<Parameters<typeof useLexicalTextEntity>[0]>(
    (text) => {
      const matchArr = PLACEHOLDER_REGEX.exec(text);

      if (matchArr === null) {
        return null;
      }

      const placeholderLength = matchArr[0].length;
      const startOffset = matchArr.index;
      const endOffset = startOffset + placeholderLength;

      return {
        end: endOffset,
        start: startOffset,
      };
    },
    []
  );

  const createNode = useCallback(
    (node: TextNode) => $createCustomTextHighlightNode(node.getTextContent()),
    []
  );

  useLexicalTextEntity<CustomTextHighlightNode>(
    getMatch,
    CustomTextHighlightNode,
    createNode
  );

  return null;
}
