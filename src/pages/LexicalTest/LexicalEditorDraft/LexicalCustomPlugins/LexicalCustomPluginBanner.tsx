import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { useEffect } from "react";
import {
  $createBannerNode,
  BannerNode,
  INSERT_BANNER_COMMAND,
} from "../LexicalCustomNodes/LexicalCustomNodeBanner";

type Props = {};

export default function LexicalCustomPluginBanner({}: Props) {
  const [editor] = useLexicalComposerContext();

  // check if node is registered
  useEffect(() => {
    if (!editor.hasNodes([BannerNode])) {
      throw new Error("BannerNode is not registered");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // register our command handler
  useEffect(() => {
    const unregister = editor.registerCommand(
      INSERT_BANNER_COMMAND,
      () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createBannerNode());
        }

        /*
        return 
        true = we've handled command, don't let it propagate to further command listeners
        false = we've not handled command, let it propagate to further command listeners
        */

        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    return unregister;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
