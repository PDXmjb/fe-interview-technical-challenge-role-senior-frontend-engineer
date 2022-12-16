import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import InfoTable from '../InfoTable';

function PolicyHoldersView() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(
      'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <p>Loading!</p>;
  }

  if (error || !data) {
    return (
      <p>We're sorry, something has gone wrong! Please try again later.</p>
    );
  }

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

  const { policyHolders } = data;

  let personRows: Row[] = [];

  if (policyHolders) {
    // Supports having multiple policy holders returned by the query.
    personRows = policyHolders.flatMap((policyHolder: PolicyHolder) => {
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

  return (
    <Box>
      <InfoTable header="Policy Holders" rows={personRows}></InfoTable>
    </Box>
  );
}

export default PolicyHoldersView;
