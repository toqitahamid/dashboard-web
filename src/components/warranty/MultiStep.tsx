import {
  Box,
  Card,
  CardContent,
  StepLabel,
  Stepper,
  Step,
} from '@material-ui/core';
import { Formik, Field, FormikConfig, Form, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { mixed, number, object } from 'yup';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';

const MultiStep = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <FormikStepper
            initialValues={{
              firstName: '',
              lastName: '',
              millionaire: false,
              money: 0,
              description: '',
            }}
            onSubmit={() => {}}
          >
            <FormikStep label="Orders">
              <Box paddingBottom={3}>
                <Field
                  fullWidth
                  name="firstName"
                  component={TextField}
                  label="First Name"
                />
              </Box>

              <Box paddingBottom={3}>
                <Field
                  component={KeyboardDatePicker}
                  // placeholder="2018/10/10"
                  label="Date"
                  name="lastName"
                  disableFuture
                  // format="MM/dd/yyyy"
                />
                ;
              </Box>
              <Box paddingBottom={3}>
                <Field
                  name="millionaire"
                  type="checkbox"
                  component={CheckboxWithLabel}
                  Label={{ label: 'I am a millionaire' }}
                />
              </Box>
            </FormikStep>

            <FormikStep
              label=" Merchants"
              validationSchema={object({
                money: mixed().when('millionaire', {
                  is: true,
                  then: number()
                    .required()
                    .min(1_000_000, 'Because you said you are a millionaire'),
                  otherwise: number().required(),
                }),
              })}
            >
              <Box paddingBottom={3}>
                <Field
                  fullWidth
                  name="money"
                  type="number"
                  component={TextField}
                  label="Money"
                />
              </Box>
            </FormikStep>

            <FormikStep label="More Info">
              <Box paddingBottom={3}>
                <Field
                  fullWidth
                  name="description"
                  component={TextField}
                  label="Description"
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStep;

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const [step, setStep] = useState(0);

  const currentChild = childrenArray[step];

  // console.log('children', currentChild);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          console.log(values);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete="off">
        <Stepper alternativeLabel activeStep={step}>
          {childrenArray.map((child) => (
            <Step key={child.props.label}>
              <StepLabel>{child.props.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {currentChild}
        {step > 0 ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
        ) : null}

        <Button color="primary" variant="contained" type="submit">
          {isLastStep() ? 'Submit' : 'Next'}
        </Button>
      </Form>
    </Formik>
  );
}
