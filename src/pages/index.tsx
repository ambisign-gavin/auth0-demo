import React from 'react';
import {
  Container, Stack,
} from '@mui/material';
import type { NextPage } from 'next';
import PageLayout from 'src/components/common/PageLayout';
import UsersTable from 'src/components/Dashboard/UsersTable';
import StatisticsPaper from 'src/components/Dashboard/StatisticsPaper';
import { useUsersStatistics } from 'src/api/user';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from 'src/atom';

const Home: NextPage = React.memo(() => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  const { data: usersStatistics } = useUsersStatistics({
    enabled: isAuthenticated,
  });

  return (
    <PageLayout title="Dashboard">
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <StatisticsPaper
            title="Total Users"
            value={usersStatistics?.userCount || 0}
          />
          <StatisticsPaper
            title="Active Users Today"
            value={usersStatistics?.todayActivedSessionCount || 0}
          />
          <StatisticsPaper
            title="Active Users Last 7 Days"
            value={usersStatistics?.averageActivedSessionCountLastWeek || 0}
          />
        </Stack>
        <UsersTable />
      </Container>
    </PageLayout>
  );
});

export default Home;
