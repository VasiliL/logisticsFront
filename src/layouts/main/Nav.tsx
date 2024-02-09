import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from '@src/router/hooks/use-pathname';
import { useResponsive } from '@src/hooks/useResponsive';

import { Link } from 'react-router-dom';

import { NAV } from './ConfigLayout';

import { ConfigNavigation } from './ConfigNavigation';

interface INavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export const Nav = (props: INavProps) => {
  const { onCloseNav, openNav } = props;
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg', undefined);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderLogo = <span></span>;

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }} style={{ marginTop: '80px' }}>
      {renderLogo}

      {ConfigNavigation.map(item => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: theme => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderMenu}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderMenu}
        </Drawer>
      )}
    </Box>
  );
};

const NavItem = ({ item }) => {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'none',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: theme => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
};
