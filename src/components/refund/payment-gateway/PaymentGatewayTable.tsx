import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import MUIDataTable from 'mui-datatables';
import useSWR from 'swr';
import dayjs from 'dayjs';

const Index = ({ cookies, token }) => {
  const router = useRouter();

  const config = {
    headers: { Authorization: `Bearer ${cookies.token}` },
  };
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'http://localhost:20802/refund/api/v1/payment-gateway',
    fetcher
  );

  if (error) return <div>An error has occurred</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const formatDate = (date) => {
    return dayjs(date).format('D MMM, YYYY h:mm A');
  };

  const columns = [
    {
      name: 'ID',
      label: 'ID',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'gateway_name',
      label: 'Gateway Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    // {
    //   name: 'ID',
    //   label: 'Action',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //       <IconButton
    //         aria-label="arrow"
    //         onClick={() => router.push(`/refund/warranty-details/${value}`)}
    //       >
    //         <ArrowForwardIcon />
    //       </IconButton>
    //     ),
    //   },
    // },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
  };

  return <MUIDataTable data={data.data} columns={columns} options={options} />;
};
export default Index;
