import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, FormProvider } from 'react-hook-form';
import OrderForm from './OrderForm';
import RefundForm from './RefundForm';
import axios from 'axios';
import { GradeRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 16,
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: 16,
    // height: 400,
    // width: 800,
  },
}));

function getSteps() {
  return ['Order information', 'Refund Information'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <OrderForm />;
    case 1:
      return <RefundForm />;

    default:
      return 'unknown step';
  }
}

const RefundStepper = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      woo_order_id: '',
      refund_request_date: '',
      customer_name: '',
      phone_no: '',
      refund_status: '',
      refund_type: '',
      refund_amount: '',
      gateway_name: '',
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  // const isStepOptional = (step) => {
  //   return step === 1 || step === 2;
  // };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      axios
        .post('http://localhost:20802/refund/api/v1/refund/create', {
          woo_order_id: data.woo_order_id,
          refund_request_date: data.refund_request_date,
          customer_name: data.customer_name,
          phone_no: data.phone_no,
          refund_status: data.refund_status,
          refund_type: data.refund_type,
          refund_amount: data.refund_amount,
          gateway_name: data.gateway_name,
        })
        .then((response) => {
          console.log(response.data.error);
        })
        .catch((error) => {
          console.log(error);
        });
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepSkipped(activeStep)) {
  //     setSkippedSteps([...skippedSteps, activeStep]);
  //   }
  //   setActiveStep(activeStep + 1);
  // };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = { completed: false };
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography
          //       variant="caption"
          //       align="center"
          //       style={{ display: 'block' }}
          //     >
          //       optional
          //     </Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <Paper className={classes.paper}>
              <form
                autoComplete="none"
                onSubmit={methods.handleSubmit(handleNext)}
              >
                {getStepContent(activeStep)}

                <Grid container justifyContent="center" spacing={8}>
                  <Grid item>
                    <Button
                      className={classes.button}
                      disabled={activeStep === 0}
                      variant="contained"
                      color="primary"
                      onClick={handleBack}
                    >
                      back
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      // onClick={handleNext}
                      type="submit"
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default RefundStepper;
