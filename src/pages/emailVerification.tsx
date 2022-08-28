import React from 'react';
import {
  Container, Paper, Stack, Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import { useMineProfile, useSendVerificationEmail } from 'src/api/user';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { isNil, not } from 'ramda';

const CooldownSecs = 30;

const Profile: NextPage = () => {
  const router = useRouter();

  const { mutate, isLoading } = useSendVerificationEmail();

  const cooldownTimerRef = React.useRef<number>();

  const [isCooldown, setCooldown] = React.useState(false);
  const [cooldownSecs, setCooldownSecs] = React.useState(CooldownSecs);

  const { data: profile } = useMineProfile();

  const clearCooldownTimerIfNeed = () => {
    if (not(isNil(cooldownTimerRef.current))) {
      clearInterval(cooldownTimerRef.current);
    }
  };

  React.useEffect(() => {
    if (profile && profile.emailVerified) {
      router.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
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
        <Stack justifyContent="center" alignItems="center" height={1}>
          <Typography variant="h4">A verification link has been sent to your email account.</Typography>
          <Typography variant="h6" my={2} sx={{ opacity: 0.8 }}>
            You can click the resend button if you didn&apos;t receive the verification mail.
          </Typography>
          <LoadingButton
            sx={{
              whiteSpace: 'nowrap',
            }}
            loading={isLoading || isCooldown}
            variant="contained"
            color="primary"
            onClick={() => {
              mutate(undefined, {
                onSuccess: () => {
                  setCooldown(true);
                  setCooldownSecs(CooldownSecs);
                  clearCooldownTimerIfNeed();
                  cooldownTimerRef.current = setInterval(() => {
                    setCooldownSecs((secs) => {
                      if (secs === 0) {
                        clearCooldownTimerIfNeed();
                        setCooldown(false);
                        return 30;
                      }
                      return secs - 1;
                    });
                  }, 1000) as any as number;
                },
              });
            }}
          >
            Resend Email Verification
          </LoadingButton>
          {isCooldown ? (
            <Typography ml={1} mt={2}>
              please wait
              {' '}
              {cooldownSecs}
              {' '}
              seconds to resend again.
            </Typography>
          ) : undefined}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
