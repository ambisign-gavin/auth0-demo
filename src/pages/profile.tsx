import React from 'react';
import { Container, Paper } from '@mui/material';
import type { NextPage } from 'next';
import PageLayout from 'src/components/common/PageLayout';
import ProfileGrid from 'src/components/Profile/ProfileGrid';

const Profile: NextPage = () => (
  <PageLayout title="My Profile">
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flex: 1,
        mb: 2,
      }}
    >
      <Paper
        sx={{
          flex: 1,
          my: '5%',
        }}
      >
        <ProfileGrid />
      </Paper>
    </Container>
  </PageLayout>
);

export default Profile;
