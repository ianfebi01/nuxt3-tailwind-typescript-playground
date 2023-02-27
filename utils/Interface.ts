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
