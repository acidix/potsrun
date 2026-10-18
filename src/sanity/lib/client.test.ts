import { blocksToText } from "./client";

describe("blocksToText", () => {
  const blocks = [
    { children: [{ text: "Hello " }, { text: "world" }] },
    { children: [{ text: "!" }] },
  ];

  it("joins all block text", () => {
    expect(blocksToText(blocks)).toBe("Hello world!");
  });

  it("truncates to the requested preview length", () => {
    expect(blocksToText(blocks, 5)).toBe("Hello");
  });

  it("tolerates blocks without children", () => {
    expect(blocksToText([{}])).toBe("");
  });
});
