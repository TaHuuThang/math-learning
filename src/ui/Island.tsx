import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { islands, type IslandName, type IslandProps } from '../islands/registry';

/**
 * Thành phần tương tác ("đảo"): máy chủ dựng sẵn HTML, trình duyệt gắn React (hydrate) để tương tác.
 * Props được chuyển qua thuộc tính data-props (React tự escape) – không chứa đáp án bí mật.
 */
export function Island<N extends IslandName>({ name, props, className }: { name: N; props: IslandProps<N>; className?: string }) {
  const Comp = islands[name] as unknown as (p: Record<string, unknown>) => ReactElement;
  const html = renderToString(<Comp {...(props as unknown as Record<string, unknown>)} />);
  return <div className={className} data-island={name} data-props={JSON.stringify(props)} dangerouslySetInnerHTML={{ __html: html }} />;
}
