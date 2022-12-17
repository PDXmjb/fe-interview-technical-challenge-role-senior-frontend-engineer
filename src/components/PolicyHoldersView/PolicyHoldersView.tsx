import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';
import InfoTable from '../InfoTable';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface PolicyHolder {
  name: string;
  age: string;
  phoneNumber: string;
  isPrimary: boolean;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

interface Row {
  key: string;
  value: string;
}

function getPolicyHolderKeys(policyHolders: PolicyHolder[]): Row[][] {
  return policyHolders.map((policyHolder: PolicyHolder) => {
    const { name, age, phoneNumber, isPrimary, address } = policyHolder;

    return [
      { key: 'Name', value: name },
      { key: 'Age', value: age },
      {
        key: 'Address',
        value: address.line2
          ? `${address.line1} ${address.line2}, ${address.city} ${address.state} ${address.postalCode}`
          : `${address.line1}, ${address.city} ${address.state} ${address.postalCode}`,
      },
      { key: 'Phone number', value: phoneNumber },
      {
        key: 'Primary policyholder?',
        value: isPrimary ? 'Yes' : 'No',
      },
    ];
  });
}

function PolicyHoldersView() {
  const [policyData, setPolicyData] = useState();
  const [addPolicy, setAddPolicy] = useState(false);
  const { isLoading, error, data } = useQuery(
    'repoData',
    async () =>
      await axios.get(
        'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
      )
  );

  useEffect(() => {
    if (data) {
      setPolicyData(data?.data?.policyHolders);
    }
  }, [data]);

  useEffect(() => {
    if (addPolicy) {
      axios
        .post(
          'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
          {
            name: 'Anabelle Policyholder',
            age: 52,
            phoneNumber: '1-555-203-2111',
            isPrimary: false,
            address: {
              line1: '123 Fake St',
              city: 'Nuremburg',
              state: 'Switzerland',
              postalCode: '0822112',
            },
          }
        )
        .then((response) => setPolicyData(response.data.policyHolders));
    }
  }, [addPolicy]);

  const handleAddPolicyHolder = () => {
    setAddPolicy(true);
  };

  if (isLoading) {
    return <p>Loading!</p>;
  }

  if (error || !data) {
    return (
      <p>We're sorry, something has gone wrong! Please try again later.</p>
    );
  }

  let personRows: Row[][] = [];

  if (policyData) {
    personRows = getPolicyHolderKeys(policyData);
  }

  return (
    <Box>
      {personRows.map((row, index) => {
        return (
          <InfoTable
            sx={{ marginBottom: '35px' }}
            key={index}
            header="Policyholder:"
            rows={row}
          ></InfoTable>
        );
      })}

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleAddPolicyHolder}
      >
        Add a new policy
      </Button>
    </Box>
  );
}

export default PolicyHoldersView;
