import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_guide_info",
  title: "Get guide info",
  description:
    "Returns public information about the anxiety guide by Mariana Anício: title, positioning, what the reader will learn, and the checkout anchor.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      title:
        "Você não precisa esperar a ansiedade desaparecer para voltar a viver.",
      author: "Mariana Anício",
      format: "Guia psicoeducativo digital",
      audience:
        "Pessoas que já tentaram controlar a ansiedade de várias formas e querem um caminho mais acolhedor e prático.",
      disclaimer:
        "Este material possui caráter psicoeducativo e não substitui acompanhamento psicológico individual.",
      checkoutAnchor: "#pricing",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});