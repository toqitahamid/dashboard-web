import { Card, CardContent, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
}));

const WarrantyStatusCard = ({ cookies }) => {
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  const fetcher = (url) => fetch(url, config).then((res) => res.json());

  const { data, error } = useSWR(
    'http://localhost:20801/warranty/api/v1/status/getWarrantyCountByStatusName',
    fetcher
  );

  if (error) return <div>An error has occurred</div>;
  // if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <>
      {data == [] ? (
        <Grid container spacing={10}>
          {data.data.map((status) => (
            <Grid item xs={6} key={status.id}>
              <Card>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {status.status}
                  </Typography>
                  <Typography variant="h5" component="h2" color="primary">
                    {status.warranty_counts}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </>
  );
};

export default WarrantyStatusCard;
