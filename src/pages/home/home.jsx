import PageContent from '../../layouts/components/home/PageContent';
import PageSection from '../../layouts/components/home/PageSection';

import Panel from '../../layouts/components/shared/Panel';

const HomePage = () => {
  return (
    <PageContent heading="Welcome back, Pongo McDughartey">
      <PageSection heading="Overview">
        <Panel>{/* Panel content goes here... */}</Panel>
      </PageSection>
    </PageContent>
  );
};

export default HomePage;
