import type {
  DOMConversionMap,
  EditorConfig,
  LexicalNode,
  SerializedTextNode,
} from "lexical";
import { TextNode } from "lexical";

export type SerializedVariableNode = SerializedTextNode;

const TYPE = "custom-text-highlight";

const DATA_CUSTOM_NODE_TYPE = "data-custom-node-type";

export class CustomTextHighlightNode extends TextNode {
  static getType(): string {
    return TYPE;
  }

  static clone(node: CustomTextHighlightNode): CustomTextHighlightNode {
    return new CustomTextHighlightNode(node.__text, node.__key);
  }

  static importJSON(
    serializedNode: SerializedVariableNode
  ): CustomTextHighlightNode {
    const node = $createCustomTextHighlightNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedVariableNode {
    return {
      ...super.exportJSON(),
      type: TYPE,
      version: 1,
    };
  }

  // runs when typing in editor
  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    // dom.style.cssText = domCssText;
    dom.className = TYPE;
    dom.setAttribute(DATA_CUSTOM_NODE_TYPE, TYPE);

    return dom;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (node) => {
        if (node.getAttribute(DATA_CUSTOM_NODE_TYPE) !== TYPE) {
          return null;
        }

        return {
          priority: 1,
          conversion: (_node) => {
            if (_node.textContent) {
              return {
                node: $createCustomTextHighlightNode(_node.textContent),
              };
            }

            return null;
          },
        };
      },
    };
  }

  canInsertTextBefore(): boolean {
    return false;
  }

  canInsertTextAfter(): boolean {
    return false;
  }

  isTextEntity(): true {
    return true;
  }
}

export function $createCustomTextHighlightNode(
  variable: string
): CustomTextHighlightNode {
  return new CustomTextHighlightNode(variable);
}

export function $isCustomTextHighlightNode(
  node: LexicalNode | null | undefined | undefined
): boolean {
  return node instanceof CustomTextHighlightNode;
}
