import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

type Props = {
  setEditorContent: (editorContent: string) => void;
};

export default function LexicalCustomPluginOnChange({
  setEditorContent,
}: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        // docs suggest converting entire editor-state to json to store in DB like so
        // (we'll probably just store html string though)
        // const editorStateJSON = editorState.toJSON();
        // console.log(JSON.stringify(editorStateJSON, null, 2));

        editorState.read(() => {
          // Just like editor.update(), .read() expects a closure where you can use
          // the $ prefixed helper functions.
          const htmlString = $generateHtmlFromNodes(editor, null);
          setEditorContent(htmlString);
        });
      }
    );

    const unregisterTextContentListener = editor.registerTextContentListener(
      (textContent) => {
        // ability to get back text w/o formatting e.g. for URL or SMS
        console.log(textContent);
      }
    );

    return () => {
      // unregister listeners when unmounting
      unregisterUpdateListener();
      unregisterTextContentListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
