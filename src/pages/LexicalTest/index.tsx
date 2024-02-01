import { useState } from "react";
import { Container } from "@mui/material";
import LexicalEditorDraft from "./LexicalEditorDraft";
import LexicalEditor from "./LexicalEditorV0";

type Props = {};

export default function LexicalTest({}: Props) {
  const [editorContent, setEditorContent] = useState(
    `<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">initial html content. Hi </span><span class="custom-text-highlight" style="background-color: red; color: white; white-space: pre-wrap;">{{ contact.email }}</span><span style="white-space: pre-wrap;"> asas</span></p>`
  );

  console.log("editorContent", editorContent);

  return (
    <Container maxWidth="lg">
      <LexicalEditorDraft
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />

      <LexicalEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
    </Container>
  );
}
