import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_author_info",
  title: "Get author info",
  description:
    "Returns public information about the author Mariana Anício, creator of the anxiety guide.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Mariana Anício",
      role: "Psicóloga",
      approach:
        "Abordagem acolhedora e prática para ajudar pessoas a construírem uma vida guiada pelo que realmente importa.",
      tagline:
        "Vamos construir uma vida guiada pelo que realmente importa?",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});