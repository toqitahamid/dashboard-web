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

const fetcher = (url) => fetch(url).then((res) => res.json());

const StatusHistory = ({ warrantyId }) => {
  const classes = useStyles();

  const { data, error } = useSWR(
    `http://localhost:20801/warranty/api/v1/warranty/getWarrantyStatusHistory/${warrantyId}`,
    fetcher
  );

  console.log(data);

  if (error) return <div>An error has occurred</div>;
  if (!data) return <div>Loading</div>;

  console.log(data);

  const columns = [
    {
      name: 'created_at',
      label: 'Created At',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
  };

  return (
    <>
      <div className={classes.root}>
        {/*<MUIDataTable*/}
        {/*  title={'Status History'}*/}
        {/*  data={data.data}*/}
        {/*  columns={columns}*/}
        {/*  options={options}*/}
        {/*/>*/}

        <Stepper orientation="vertical">
          {data.data.map((value) => (
            <Step active completed>
              <StepLabel>{value.status}</StepLabel>
              <StepContent>
                <Typography variant="caption">
                  {dayjs(value.created_at).format('D MMM, YYYY h:mm A')}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {/*<Stepper orientation="vertical">*/}
        {/*  <Step completed>*/}
        {/*    <StepLabel>Warranty Request Created</StepLabel>*/}
        {/*    <StepContent>*/}
        {/*      <Typography>28 July</Typography>*/}
        {/*    </StepContent>*/}
        {/*  </Step>*/}
        {/*  <Step active completed>*/}
        {/*    <StepLabel>Hello</StepLabel>*/}
        {/*    <StepContent>*/}
        {/*      <Typography>Hurray</Typography>*/}
        {/*    </StepContent>*/}
        {/*  </Step>*/}

        {/*  <Step disabled>*/}
        {/*    <StepLabel>Hello</StepLabel>*/}
        {/*    <StepContent>*/}
        {/*      <Typography>Hurray</Typography>*/}
        {/*    </StepContent>*/}
        {/*  </Step>*/}
        {/*</Stepper>*/}
      </div>
    </>
  );
};

export default StatusHistory;
