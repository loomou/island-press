import { usePageData } from '@runtime';
import { HomeHero } from '../../components/HomeHero';
import { HomeFeature } from '../../components/HomeFeature';
import { useHMR } from '../../logic/useHMR';

export function HomeLayout() {
  const { frontmatter } = usePageData();
  const latestFrontmatter = useHMR(frontmatter);
  return (
    <div>
      <HomeHero hero={latestFrontmatter.hero} />
      <HomeFeature features={latestFrontmatter.features} />
    </div>
  );
}
