import { Box, Container, Typography } from '@mui/material';

import GymCardContainer from './GymCardsContainer';

const Gyms = () => (
  <>
    <Box
      sx={{
        bgcolor: theme => theme.palette.primary.main,
        height: '50rem',
        m: '8rem auto 0 auto',
        maxWidth: '75rem',
        px: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h3"
        className="centered-text"
        sx={{
          py: 2,
          color: theme => theme.palette.primary.contrastText
        }}
      >
        Locations:
      </Typography>
      <Container
        style={{ overflowY: 'scroll', height: '40rem', }}
        sx={{
          color: theme => theme.palette.primary.contrastText,
          bgcolor: theme => theme.palette.primary.light,
          m: '0 auto',
          borderRadius: 2,
        }}>
        <GymCardContainer />
      </Container>
    </Box>
  </>
);

export default Gyms;