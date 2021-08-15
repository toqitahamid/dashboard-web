import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../auth';
import { Button, Grid } from '@material-ui/core';

const Index = () => {
  return (
    <div style={{ padding: '40px' }}>
      <Grid
        container
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Link href="/login" passHref>
            <Button color="primary" variant="contained">
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
