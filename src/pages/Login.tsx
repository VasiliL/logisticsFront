import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import authStore from '@src/store/AuthStore';
import { IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <main>
      <CssBaseline />
      <Paper
        sx={{
          width: 600,
          height: '100vh',
          mx: 'auto',
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          border: 'none',
          background: 'none',
        }}
        variant="outlined"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={'/assets/icons/auth/lock.svg'} alt={'logo'} width={'100 px'} />
          <Typography sx={{ mt: 1, fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
            Авторизация пользователя
          </Typography>
        </Box>

        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}
          component={'form'}
          onSubmit={e => {
            authStore.login({ username: e.target[0].value, password: e.target[2].value }).then(() => {
              window.location.reload();
            });
            e.preventDefault();
          }}
        >
          <FormControl>
            <TextField id="outlined-email" label="Логин" name={'login'} type="text" required />
          </FormControl>
          <FormControl sx={{ mt: 3, mb: 3 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button size={'large'} type={'submit'} sx={{ mt: 1 }} variant={'contained'}>
            ВОЙТИ
          </Button>
        </Box>
      </Paper>
    </main>
  );
};
