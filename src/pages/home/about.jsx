import PageContent from '../../layouts/components/home/PageContent';

import Notice from '../../components/shared/Notice';

const AboutPage = () => {
  return (
    <PageContent heading="About Sheets">
      <Notice status="warn" heading="Under Construction" message="This page is currently under construction." />
      {/* Page content goes here... */}
    </PageContent>
  );
};

export default AboutPage;
