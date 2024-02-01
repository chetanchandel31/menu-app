import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";

type Params = {
  queryString: string | null;
};

const allOptions = [
  "{{ contact.email }}",
  "{{ contact.firstName }}",
  "{{ contact.lastName }}",
  "{{ contact.fullName }}",
  "{{ contact.linkedInUrl }}",
  "{{ contact.facebookUsername }}",
  "{{ contact.address }}",
  "{{ contact.height }}",
  "{{ contact.role }}",
  "{{ contact.abracadabra }}",
];

export default function useCustomSuggestionLookupService({
  queryString,
}: Params) {
  const fuse = useMemo(
    // `threshold` for controlling fuzziness, 0 requires perfect match and 1 would match anything
    () => new Fuse(allOptions, { threshold: 0.4 }),
    []
  );

  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!queryString) {
      setResults([]);
    } else {
      setResults(fuse.search(queryString).map((result) => result.item));
    }
  }, [queryString, fuse]);

  return results;
}
