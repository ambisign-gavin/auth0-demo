/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Avatar, Container, Menu, MenuItem, Skeleton, Stack, Typography,
} from '@mui/material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMineProfile } from 'src/api/user';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from 'src/atom';
import env from 'src/constants/env';

type IPageLayout = {
  title: string;
};

const PageLayout = React.memo<React.PropsWithChildren<IPageLayout>>((props) => {
  const { title, children } = props;

  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  const { data: profile } = useMineProfile();

  const userMenuAnchorEl = React.useRef<HTMLDivElement>(null);

  const [isOpenUserMenu, setOpenUserMenu] = React.useState(false);

  const router = useRouter();

  return (
    <>
      <Stack
        height="8vh"
        paddingX={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        component="nav"
        position="sticky"
        top={0}
        bgcolor="background.default"
        mb={1}
        zIndex={1}
      >
        <Stack direction="row" alignItems="center" width="50%">
          <Link href="/">
            <a>
              <HomeIcon
                sx={{ color: 'text.primary' }}
                fontSize="large"
                className="cursor-pointer"
              />
            </a>
          </Link>
          <Typography
            ml={0.5}
            variant="h5"
          >
            {title}
          </Typography>
        </Stack>
        <Stack
          className="cursor-pointer"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          width="50%"
          onClick={() => isAuthenticated && setOpenUserMenu((open) => !open)}
        >
          <Typography sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          >
            {isAuthenticated ? profile?.name : <Skeleton width={50} sx={{ mr: 1 }} /> }
          </Typography>

          {isAuthenticated
            ? (
              <Avatar
                ref={userMenuAnchorEl}
                sx={{ color: 'text.primary', bgcolor: 'transparent' }}
              >
                <AccountCircleIcon fontSize="large" />
              </Avatar>
            ) : <Skeleton variant="circular"><Avatar /></Skeleton>}
          <ArrowDropDownIcon />
          <Menu
            disableAutoFocusItem
            open={isOpenUserMenu}
            anchorEl={userMenuAnchorEl.current}
            PaperProps={{
              sx: {
                width: 220,
              },
            }}
          >
            <MenuItem
              sx={{ justifyContent: 'center' }}
              onClick={() => router.push('/profile')}
            >
              Profile
            </MenuItem>
            <MenuItem
              sx={{ justifyContent: 'center' }}
              onClick={() => { window.location.href = env.LOGOUT_URL; }}
            >
              Logout

            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
      {isAuthenticated ? children : (
        <Container
          maxWidth="lg"
          sx={{
            mb: 2,
          }}
        >
          <>
            <Skeleton
              width="100%"
              height={100}
            />
            <Skeleton
              width="100%"
              height={450}
            />
          </>
        </Container>
      )}
    </>
  );
});

export default PageLayout;
