import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
      <Grid item container direction="column" spacing={2} alignItems="center">
        <Grid item>
            <Link to = '/Movies'>
              <Button variant="contained" color="primary" style={{ width: '200px' }}>
                Zadządzanie dostępnymi filmami
              </Button>
             </Link>
        </Grid>
        <Grid item>
            <Link to = '/Events'>
              <Button variant="contained" color="primary" style={{ width: '200px' }}>
                Zarządzanie wydarzeniami
              </Button>
             </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
