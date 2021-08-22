import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import useSWR from 'swr';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: 16,
  },
  formControl: {
    margin: 8,
    minWidth: 300,
    paddingBottom: 30,
  },
}));

const fetcher = (url) => fetch(url).then((res) => res.json());

const SelectWarrantyType = ({ field }) => {
  const classes = useStyles();
  let warrantyTypeList;

  axios
    .get('https://api.penguin.com.bd/warranty/api/v1/warranty-type')
    .then(function (response) {
      warrantyTypeList = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // const { data, error } = useSWR(
  //   'http://localhost:20801/warranty/api/v1/warranty-type',
  //   fetcher
  // );
  //
  // if (error) return <div>An error has occurred.</div>;
  // if (!data) return <div>Loading</div>;

  return (
    <>
      <Select
        labelId="warranty-type"
        id="warranty-type"
        value={field.value}
        onChange={(data) => field.onChange(data)}
      >
        {warrantyTypeList.data.map((data) => (
          <MenuItem key={data.ID} value={data.type}>
            {data.type}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectWarrantyType;
