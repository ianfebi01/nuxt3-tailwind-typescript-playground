import {
  ValidationRuleWithoutParams,
  ValidationRuleWithParams,
} from "@vuelidate/core";

export interface Fields {
  valueName: string;
  fieldType: string;
  defaultValue?: any;
  type?: string;
  label?: string;
  placeholder?: string | Array<string>;
  validations?: {
    required?: boolean;
    minLength?: number;
    sameAs?: string;
    numeric?: boolean;
    email?: boolean;
  };
  checkboxItem?: {
    text?: string;
    value?: string;
  }[];
  items?: {
    text: string;
    value: string | number;
  }[];
}

export interface Submenu {
  name: string;
  url: string;
}
export interface Menus {
  name: string;
  url: string;
  icon: string;
  collapsible?: boolean;
  submenu?: Submenu[];
}

export interface CountryPhoneCode {
  name: string;
  dial_code: string;
  code: string;
}
export interface OtpMatch {
  user_id?: string;
  otp_code?: number | null;
}

export interface Login {
  phone?: number;
  password?: string;
  latlong?: string;
  device_token?: string;
  device_type?: number;
}
export interface Register {
  phone?: number;
  password?: string;
  latlong?: string;
  device_token?: string;
  device_type?: number;
}

export interface RulesFace {
  required?: ValidationRuleWithoutParams<string>;
  email?: ValidationRuleWithoutParams<string>;
  minLength?: ValidationRuleWithParams<{ min: number }, any>;
  numeric?: ValidationRuleWithoutParams<number>;
  sameAs?: ValidationRuleWithParams<
    { equalTo: string | number; otherName: string },
    any
  >;
}

export interface Position<T> {
  timestamp?: number;
  coords?: T;
}

export interface Coords {
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  longitude?: number;
  latitude?: number;
  speed?: number | null;
}

export interface TempForm<T> {
  [key: string]: T;
}

export interface Event<T> {
  target: T;
}

export interface Form {
  [key: string]: number | string;
}

// Store
export interface UserPicture {
  id: string;
  picture: {
    url: string;
  };
}

export interface UserData {
  id?: string;
  name?: string;
  level?: number;
  age?: number | null;
  birthday?: string | null;
  gender?: string | null;
  zodiac?: string | null;
  hometown?: string | null;
  bio?: string | null;
  latlong?: string | null;
  education?: {
    school_name: string | null;
    graduation_time: string | null;
  };
  career?: {
    company_name: string | null;
    starting_from: string | null;
    ending_in: string | null;
  };
  user_pictures?: UserPicture[];
  user_picture?: UserPicture;
  cover_picture?: {
    url?: string | null;
  };
}

export interface List {
  name?: string;
  date?: string;
  done?: number;
  description?: string;
  location?: string;
}
