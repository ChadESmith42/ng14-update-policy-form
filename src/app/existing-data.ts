import { Policy } from './policy.model';

export const POLICIES: Policy[] = [
  {
    isInactive: false,
    isPrimary: true,
    payer: 'Annoying Lizzard Insurance',
    policyId: 'abc123',
    groupNo: 'last',
    pcn: 'abc123',
    bin: 'abc123',
  },
  {
    isInactive: false,
    isPrimary: false,
    payer: 'Mayhem Insurance',
    policyId: 'cde456',
    groupNo: 'cde456',
    pcn: 'cde456',
    bin: 'cde456',
  },
];

export const PAYER_NAMES: string[] = [
  'Acme Insurance',
  'Emu Insurance',
  'Annoying Lizzard Insurance',
  'Annoying Woman Insurance',
  'Mayhem Insurance',
  'Intrusive Neighbor Insurance',
  'Know-It-All Agrarian Insurance',
];
