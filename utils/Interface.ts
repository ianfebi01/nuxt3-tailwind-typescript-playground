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
    value: string;
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
  phone: number;
  password: string;
  latlong: string;
  device_token: string;
  device_type: number;
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
