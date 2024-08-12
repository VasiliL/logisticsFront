import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { alpha, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import { Collapse, List, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { usePathname } from '@src/router/hooks/use-pathname';
import { useResponsive } from '@src/hooks/useResponsive';

import { NAV } from './ConfigLayout';
import { ConfigNavigation } from './ConfigNavigation';

interface INavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export const Nav = (props: INavProps) => {
  const { onCloseNav, openNav } = props;
  const upLg = useResponsive('up', 'lg', undefined);
  const pathname = usePathname();
  const theme = useTheme();
  const role = localStorage.getItem('role') ?? '';

  const [openStates, setOpenStates] = React.useState([true, true]); // Initial open states for each collapse menu

  const handleClick = index => {
    const newOpenStates = [...openStates]; // Copy the current open states array
    newOpenStates[index] = !newOpenStates[index]; // Toggle the open state of the clicked collapse menu
    setOpenStates(newOpenStates); // Update the open states array
  };

  const renderMenuItem = (item, index) => {
    if (item.children) {
      return (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{
              pl: 4,
              color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
            }}
            onClick={() => handleClick(index)}
          >
            <ListItemIcon
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? `${theme.palette.primary.light} !important`
                    : theme.palette.primary.main,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {openStates[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
            <List
              sx={{
                boxShadow: 'none',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.contrastText,
              }}
              component="div"
              disablePadding
            >
              {item.children.map(subItem => {
                const active = subItem.path === pathname;

                return (
                  <ListItemButton
                    component={Link}
                    to={subItem.path}
                    key={subItem.title}
                    sx={{
                      pl: 4,
                      minHeight: 44,
                      typography: 'body2',
                      textTransform: 'none',
                      fontWeight: 'fontWeightMedium',
                      color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                      ...(active && {
                        fontWeight: 'fontWeightSemiBold',
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.light, 0.31)
                            : alpha(theme.palette.primary.main, 0.3),
                      }),
                    }}
                  >
                    <ListItemIcon> {subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.title} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </React.Fragment>
      );
    } else {
      const active = item.path === pathname;

      return (
        <ListItemButton
          component={Link}
          to={item.path}
          key={item.title}
          sx={{
            pl: 4,
            minHeight: 44,
            typography: 'body2',
            textTransform: 'none',
            fontWeight: 'fontWeightMedium',
            color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
            ...(active && {
              fontWeight: 'fontWeightSemiBold',
              bgcolor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.light, 0.31)
                  : alpha(theme.palette.primary.main, 0.3),
            }),
          }}
        >
          <ListItemIcon
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? `${theme.palette.primary.light} !important`
                  : theme.palette.primary.main,
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      );
    }
  };

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: openNav ? NAV.WIDTH : 0 },
      }}
    >
      {upLg ? (
        <Drawer
          sx={{
            width: NAV.WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: NAV.WIDTH,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={openNav}
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              mt: '80px',
              boxShadow: 'none',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {ConfigNavigation(role).map((item, index) => renderMenuItem(item, index))}
          </List>
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          variant={'permanent'}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
              flexShrink: 0,
            },
          }}
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              mt: '80px',
              boxShadow: 'none',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {ConfigNavigation(role).map((item, index) => renderMenuItem(item, index))}
          </List>
        </Drawer>
      )}
    </Box>
  );
};
