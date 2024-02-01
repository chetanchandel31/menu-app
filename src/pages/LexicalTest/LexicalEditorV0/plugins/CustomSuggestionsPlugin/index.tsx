import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuTextMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { $createTextNode, TextNode } from "lexical";
import { useCallback, useMemo, useState } from "react";
import * as ReactDOM from "react-dom";
import SuggestionsTypeaheadMenuItem from "./SuggestionsTypeAheadMenuItem";
import { CustomSuggestionTypeaheadOption } from "./CustomSuggestionTypeAheadOption";
import useCustomSuggestionLookupService from "./useCustomSuggestionsLookupService";

const SUGGESTION_LIST_LENGTH_LIMIT = 10;

export default function CustomSuggestionsPlugin() {
  const [editor] = useLexicalComposerContext();

  const [queryString, setQueryString] = useState<string | null>(null);

  const results = useCustomSuggestionLookupService({ queryString });

  const options = useMemo(
    () =>
      results
        .map((result) => new CustomSuggestionTypeaheadOption(result))
        .slice(0, SUGGESTION_LIST_LENGTH_LIMIT),
    [results]
  );

  const onSelectOption = useCallback(
    (
      selectedOption: CustomSuggestionTypeaheadOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void
    ) => {
      editor.update(() => {
        const suggestionNode = $createTextNode(selectedOption.text);
        if (nodeToReplace) {
          nodeToReplace.replace(suggestionNode);
        }
        suggestionNode.select();
        closeMenu();
      });
    },
    [editor]
  );

  const checkForSuggestionMatch = useCallback(
    (text: string): MenuTextMatch | null => {
      const REGEX = /{{\s*([a-zA-Z0-9_.]*)\s*}?}?/;

      const matchArr = REGEX.exec(text);

      if (matchArr === null) {
        return null;
      }

      return {
        leadOffset: matchArr.index,
        matchingString: matchArr[0],
        replaceableString: matchArr[0],
      };
    },
    []
  );

  return (
    <LexicalTypeaheadMenuPlugin<CustomSuggestionTypeaheadOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForSuggestionMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) => {
        return anchorElementRef.current && results.length
          ? ReactDOM.createPortal(
              <div className="typeahead-popover mentions-menu">
                <ul>
                  {options.map((option, i: number) => (
                    <SuggestionsTypeaheadMenuItem
                      index={i}
                      isSelected={selectedIndex === i}
                      onClick={() => {
                        setHighlightedIndex(i);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i);
                      }}
                      key={option.key}
                      option={option}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current
            )
          : null;
      }}
    />
  );
}
