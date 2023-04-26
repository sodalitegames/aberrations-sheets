import PageContent from '../../layouts/components/home/PageContent';

import Notice, { NoticeStatus } from '../../components/Notice';

const HelpPage = () => {
  return (
    <PageContent heading={`Help & Support`}>
      <Notice status={NoticeStatus.Warn} heading="Under Construction" message="This page is currently under construction." />
      {/* Page content goes here... */}
    </PageContent>
  );
};

export default HelpPage;
