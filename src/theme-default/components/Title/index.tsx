import { Helmet } from 'react-helmet-async';
import { useHMR } from '../../logic/useHMR';

export function Title({ title }: { title: string }) {
  const latestTitle = useHMR(title, 'title');
  return (
    <Helmet>
      <title>{latestTitle}</title>
    </Helmet>
  );
}
