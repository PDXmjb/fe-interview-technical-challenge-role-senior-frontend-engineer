import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';
import InfoTable from '../InfoTable';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getPolicyHolderKeys, Row } from './policy-helper';

const FAKE_POST_DATA = {
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
};

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
          FAKE_POST_DATA
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

      <Button color="primary" size="large" onClick={handleAddPolicyHolder}>
        Add a new policy
      </Button>
    </Box>
  );
}

export default PolicyHoldersView;

/*
 Future Todos before shipping this code:
 1) Translations/localization/a11y -
   - Order translations for all string values in the above.
   - Configure addresses and phone numbers based on localization libraries.
   - Confirm the page follows a correct flow based on a11y standards for keyboard and screenreader use. Add missing aria- elements as needed.
 2) Error handling
   - Add error handling for POST to more gracefully handle error states.
 3) Styles
   - Hide VIEW CHALLENGES button and make the ADD A NEW POLICY more prominent.
   - Hide "Policyholder:" header being shown for additional policyholders.
   - Consider virtualizing/paginating the list of policyholders if it could potentially be long.
 4) SOLID principles
   - Consider moving GET/POST into custom hooks in order to reduce the responsibility of the PolicyHoldersView to view logic only.
 5) Testing
   - Add unit test coverage for the PolicyHoldersView
   - Add test coverage for failed GET/POST.
*/
