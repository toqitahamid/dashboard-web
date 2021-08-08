import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, FormProvider } from 'react-hook-form';
import OrderForm from './stepper/OrderForm';
import WarrantyForm from './stepper/WarrantyForm';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Order information', 'Warranty Information'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <OrderForm />;
    case 1:
      return <WarrantyForm />;

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
  const steps = getSteps();

  // const isStepOptional = (step) => {
  //   return step === 1 || step === 2;
  // };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleSubmit = (data) => {
    console.log(data);
    // http://localhost:20801/warranty/api/v1/warranty/create
    if (activeStep == steps.length - 1) {
      axios
        .post('http://localhost:20801/warranty/api/v1/warranty/create', {
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
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      // axios({
      //   method: 'post',
      //   url: 'http://localhost:20801/warranty/api/v1/warranty/create',
      //   data: {
      //     rma_id: data.rma_id,
      //     rma_creation_date: data.rma_creation_date,
      //     sku: data.sku,
      //     order_id: data.order_id,
      //     product_name: data.product_name,
      //     customer_name: data.customer_name,
      //     customer_phone: data.customer_phone,
      //     reason: data.reason,
      //     warranty_type: data.warranty_type,
      //     status: data.status,
      //   },
      // })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  const handleNext = (data) => {
    console.log(data);
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
          console.log(response);
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
            <form
              autoComplete="none"
              onSubmit={methods.handleSubmit(handleNext)}
            >
              {getStepContent(activeStep)}

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              {/*{isStepOptional(activeStep) && (*/}
              {/*  <Button*/}
              {/*    className={classes.button}*/}
              {/*    variant="contained"*/}
              {/*    color="primary"*/}
              {/*    onClick={handleSkip}*/}
              {/*  >*/}
              {/*    skip*/}
              {/*  </Button>*/}
              {/*)}*/}

              {/*{activeStep === steps.length - 1 ? (*/}
              {/*  <Button*/}
              {/*    className={classes.button}*/}
              {/*    variant="contained"*/}
              {/*    color="primary"*/}
              {/*    // onClick={handleSubmit}*/}
              {/*    type="submit"*/}
              {/*  >*/}
              {/*    Finish*/}
              {/*  </Button>*/}
              {/*) : (*/}
              {/*  <Button*/}
              {/*    className={classes.button}*/}
              {/*    variant="contained"*/}
              {/*    color="primary"*/}
              {/*    // onClick={handleNext}*/}
              {/*    // type="submit"*/}
              {/*  >*/}
              {/*    Next*/}
              {/*  </Button>*/}
              {/*)}*/}

              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default WarrantyStepper;
