export interface PolicyHolder {
  name: string;
  age: string;
  phoneNumber: string;
  isPrimary: boolean;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface Row {
  key: string;
  value: string;
}

export function getPolicyHolderKeys(policyHolders: PolicyHolder[]): Row[][] {
  return policyHolders.map((policyHolder) => {
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
