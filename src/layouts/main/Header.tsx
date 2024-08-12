import React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';

import { bgBlur } from '@src/theme/css';
import { themeStore } from '@src/store/ThemeStore';
import { ProfileDropdownMenu } from '@src/components/ProfileDropdownMenu/ProfileDropdownMenu';
import authStore from '@src/store/AuthStore';
import { Link } from 'react-router-dom';

export const Header: React.FC<{ onOpenNav: () => void }> = observer(({ onOpenNav }) => {
  const theme = useTheme();

  const renderContent = <Box sx={{ flexGrow: 1 }} />;

  const renderCollapseIcon = authStore.isAuthenticated && (
    <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
      <MenuIcon />
    </IconButton>
  );
  const renderLogo = (
    <Link to={'/'}>
      <img
        src={themeStore.theme === 'light' ? '/assets/logo_light.png' : '/assets/logo_dark.svg'}
        alt={'logo'}
        width={'160 px'}
      />
    </Link>
  );
  const renderTheme = (
    <IconButton onClick={themeStore.changeTheme} aria-label="delete">
      <img src={themeStore.theme === 'light' ? '/assets/theme_light.svg' : '/assets/theme_dark.svg'} alt={'theme'} />
    </IconButton>
  );
  const renderProfileMenu = authStore.isAuthenticated && <ProfileDropdownMenu />;

  return (
    <AppBar
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      sx={{
        position: 'fixed',
        //height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 101,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        // ...(lgUp && {
        //   width: `calc(100% - ${NAV.WIDTH + 1}px)`,
        //   height: HEADER.H_DESKTOP,
        // }),
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderCollapseIcon}
        {renderLogo}

        {renderContent}
        {renderProfileMenu}
        {renderTheme}
      </Toolbar>
    </AppBar>
  );
});
