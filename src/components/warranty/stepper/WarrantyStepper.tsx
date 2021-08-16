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
import WarrantyForm from './WarrantyForm';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 16,
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: 16,
  },
}));

function getSteps() {
  return ['Order information', 'Warranty Information'];
}

function getStepContent(step, cookies) {
  switch (step) {
    case 0:
      return <OrderForm />;
    case 1:
      return <WarrantyForm cookies={cookies} />;

    default:
      return 'unknown step';
  }
}

const WarrantyStepper = ({ cookies }) => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      rma_id: '',
      rma_creation_date: '',
      sku: '',
      order_id: '',
      product_name: '',
      customer_name: '',
      customer_phone: '',
      reason: '',
      warranty_type: '',
      status: '',
      merchant_name: '',
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [isWarrantyExist, setIsWarrantyExist] = useState(false);

  const steps = getSteps();

  // const isStepOptional = (step) => {
  //   return step === 1 || step === 2;
  // };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  const handleNext = (data) => {
    // console.log(data);
    if (activeStep == steps.length - 1) {
      axios
        .post(
          'http://localhost:20801/warranty/api/v1/warranty/create',
          {
            rma_id: data.rma_id,
            rma_creation_date: data.rma_creation_date,
            sku: data.sku,
            order_id: data.order_id,
            product_name: data.product_name,
            customer_name: data.customer_name,
            customer_phone: data.customer_phone,
            reason: data.reason,
            warranty_type: data.warranty_type,
            status: data.status,
            merchant_name: data.merchant_name,
          },
          config
        )
        .then((response) => {
          // console.log(response.data.error);
        })
        .catch((error) => {
          setIsWarrantyExist(true);
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
        !isWarrantyExist ? (
          <Paper className={classes.paper}>
            <Typography variant="h5" align="center">
              Thank You
            </Typography>
          </Paper>
        ) : (
          <Paper className={classes.paper}>
            <Typography color="primary" variant="h5" align="center">
              Warranty Already Exist
            </Typography>
          </Paper>
        )
      ) : (
        <>
          <FormProvider {...methods}>
            <Paper className={classes.paper}>
              <form
                autoComplete="none"
                onSubmit={methods.handleSubmit(handleNext)}
              >
                {getStepContent(activeStep, cookies)}

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

export default WarrantyStepper;
