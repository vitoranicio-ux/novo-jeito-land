import { defineMcp } from "@lovable.dev/mcp-js";
import getGuideInfo from "./tools/get-guide-info";
import getAuthorInfo from "./tools/get-author-info";

export default defineMcp({
  name: "mariana-anicio-guide-mcp",
  title: "Guia Mariana Anício MCP",
  version: "0.1.0",
  instructions:
    "Public tools exposing information about Mariana Anício's anxiety guide landing page. Use get_guide_info for details about the guide and get_author_info for details about the author.",
  tools: [getGuideInfo, getAuthorInfo],
});