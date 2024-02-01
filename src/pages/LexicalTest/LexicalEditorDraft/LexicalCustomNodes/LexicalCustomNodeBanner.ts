import {
  $createParagraphNode,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
  createCommand,
} from "lexical";

/* each instance's state(editor state) has 
  1. tree of instances of lexical nodes (in lexical, a node is a class that encapsulates functionality (eg: 
      rendering the html tag to editor etc) related to an element (eg: heading, paragraph etc))
  2. selection (total 3 types: range, grid and node selection)
*/

/*
we can extend 1. decorator nodes 2. element nodes 3. text nodes

only element nodes allows to have other nodes as children
*/

export class BannerNode extends ElementNode {
  // constructor(key?: NodeKey) {
  //   super(key);
  // }

  // just return an identifier
  static getType(): string {
    return "banner-uyw9238923798";
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.key);
  }

  // `createDOM` : how to represent lexical node (which is part of editor state) in DOM
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement("div");

    // will probably use inline styles instead of this
    // but thats how lexical nodes add classes from theme
    element.className = _config.theme.banner || "";

    element.style.borderLeft = "solid 1px red";
    element.style.backgroundColor = "#ff00003b";
    element.style.padding = "8px";

    return element;
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false;
  }
  // what happens when user hits backspace at start
  collapseAtStart(_selection: RangeSelection): boolean {
    // add all children to the paragraph and replace current instance of
    // node with that paragraph
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);

    // no idea why true
    return true;
  }

  // w/o this we can't escape node upon hitting enter
  insertNewAfter(
    _selection: RangeSelection,
    restoreSelection?: boolean | undefined
  ): LexicalNode | null {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);

    return newBlock;
  }
}

// just a convention they follow
export function $createBannerNode(): BannerNode {
  return new BannerNode();
}
export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand("insertBanner");
