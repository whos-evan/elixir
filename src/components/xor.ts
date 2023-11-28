export const xor = {
  encode(str: string) {
    if (!str) return str;
    return encodeURIComponent(
      str
        .toString()
        .split("")
        .map((char, ind) =>
          ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
        )
        .join("")
    );
  },
  decode(str: string) {
    if (!str) return str;
    const [input, ...search] = str.split("?");
    return (
      decodeURIComponent(input as string)
        .split("")
        .map((char, ind) =>
          ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
        )
        .join("") + (search.length ? "?" + search.join("?") : "")
    );
  },
};
