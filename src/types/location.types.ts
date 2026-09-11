export type LocationName = {
  uz: string;
  ru?: string;
  en?: string;
  cyrl?: string;
};

export type Region = {
  id: string;
  externalId: number;
  name: LocationName;
  districtsCount: number;
};

export type District = {
  id: string;
  externalId: number;
  name: LocationName;
  soato: number;
  phoneCode: number;
  order: number;
};

export type InfoRegistrationForm = {
  name: string;
  phone: string;
  birthdate: string;
  region: string;
  district: string;
  city: string;
};

export type LocationOption = {
  id: string;
  name: {
    uz: string;
  };
  externalId: number;
};

export type LocationSelectModalProps = {
  items: LocationOption[];
  loading?: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  selectedId?: string;
  title: string;
  visible: boolean;
};
