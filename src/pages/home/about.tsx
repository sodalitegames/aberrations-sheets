import PageContent from '../../layouts/components/home/PageContent';

import Notice, { NoticeStatus } from '../../components/Notice';

const AboutPage = () => {
  return (
    <PageContent heading="About Sheets">
      <Notice status={NoticeStatus.Warn} heading="Under Construction" message="This page is currently under construction." />
      {/* Page content goes here... */}
    </PageContent>
  );
};

export default AboutPage;
