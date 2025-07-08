import { Helmet } from 'react-helmet-async';

import { DashboardContent } from 'src/layouts/dashboard';

import MainContent from 'src/components/main-content/MainContent';
import DynamicTable from 'src/components/dynamic-table/DynamicTable';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Staff List</title>
      </Helmet>

      <DashboardContent>
        <CustomBreadcrumbs
          heading="Page One"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Admin', href: '/admin' },
            { name: 'Page One' },
          ]}
        />

        <MainContent>
          <DynamicTable />
        </MainContent>
      </DashboardContent>
    </>
  );
}
