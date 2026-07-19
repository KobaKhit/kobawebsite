export function MarkdownBody({ html }: { html: string }) {
  return (
    <div
      className="prose-persona max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
