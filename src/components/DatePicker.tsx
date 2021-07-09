import { useEffect, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useForm } from 'react-hook-form';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const DatePicker = () => {
  const [date, setDate] = useState<MaterialUiPickersDate>(null);
  const { register, getValues, setValue } = useForm();
  const value = getValues('fieldName') as Date;

  useEffect(() => {
    register('fieldName');
  }, [register]);
  useEffect(() => {
    setDate(value || null);
  }, [setDate, value]);

  return (
    <KeyboardDatePicker
      value={date}
      onChange={(date) =>
        setValue('fieldName', date, { shouldValidate: true, shouldDirty: true })
      }
    />
  );
};

export default DatePicker;
