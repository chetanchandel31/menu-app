import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin";

export class CustomSuggestionTypeaheadOption extends MenuOption {
  text: string;

  constructor(text: string) {
    super(text);
    this.text = text;
  }
}
