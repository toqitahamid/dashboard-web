import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import useSWR from 'swr';
import MUIDataTable from 'mui-datatables';
import dayjs from 'dayjs';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const RefundStatusHistory = ({ refundID, cookies }) => {
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `http://localhost:20802/refund/api/v1/refund/get-refund-status-history/${refundID}`,
    fetcher
  );

  console.log(data);

  if (error) return <div>An error has occurred</div>;
  if (!data) return <div>Loading</div>;

  console.log(data);

  return (
    <Paper>
      {data.data != null ? (
        <div className={classes.root}>
          <Stepper orientation="vertical">
            {data.data.map((value, index) => (
              <Step active completed key={index}>
                <StepLabel>{value.status}</StepLabel>
                <StepContent>
                  <Typography variant="caption">
                    {dayjs(value.created_at).format('D MMM, YYYY h:mm A')}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      ) : null}
    </Paper>
  );
};

export default RefundStatusHistory;
