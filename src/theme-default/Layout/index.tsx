import 'uno.css';
import '../styles/base.css';
import '../styles/vars.css';
import '../styles/doc.css';
import { usePageData } from '@runtime';
import { Nav } from '../components/Nav';
import { HomeLayout } from './HomeLayout';
import { DocLayout } from './DocLayout';
import { NotFoundLayout } from './NotFoundLayout';
import { Title } from '../components/Title';

export function Layout() {
  const pageData = usePageData();
  const { pageType, title } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else {
      return <NotFoundLayout />;
    }
  };
  return (
    <div>
      <Title title={title} />
      <Nav />
      <section
        style={{
          paddingTop: 'var(--island-nav-height)'
        }}
      >
        {getContent()}
      </section>
    </div>
  );
}
