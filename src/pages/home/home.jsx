import PageContent from '../../layouts/components/home/PageContent';
import PageSection from '../../layouts/components/home/PageSection';

import PagePanel from '../../layouts/components/home/PagePanel';

const HomePage = () => {
  return (
    <PageContent heading="Welcome back, Pongo McDughartey">
      <PageSection heading="Overview">
        <PagePanel>{/* Panel content goes here... */}</PagePanel>
      </PageSection>
    </PageContent>
  );
};

export default HomePage;
