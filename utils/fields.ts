import { Fields } from "./Interface";

export const fields: Fields[] = [
  {
    valueName: "name",
    fieldType: "textField",
    defaultValue: "",
    type: "text",
    label: "Name",
    placeholder: "Ian Febi",
    validations: {
      required: true,
      minLength: 6,
    },
  },
  {
    valueName: "email",
    fieldType: "textField",
    defaultValue: "",
    type: "text",
    label: "Email",
    placeholder: "ianfebi01@gmail.com",
    validations: {
      required: true,
      minLength: 6,
      email: true,
    },
  },
  {
    valueName: "noHp",
    fieldType: "textField",
    defaultValue: null,
    type: "number",
    label: "Nomor Hp",
    placeholder: "6282264319643",
    validations: {
      required: true,
      minLength: 9,
      numeric: true,
    },
  },
  // {
  //   valueName: "followUpdate",
  //   fieldType: "checkbox",
  //   label: "Pilih Layanan",
  //   checkboxItem: [
  //     {
  //       text: "Pinjaman",
  //       value: "pinjaman",
  //     },
  //     {
  //       text: "Pinjol",
  //       value: "pinjol",
  //     },
  //     {
  //       text: "Kredit",
  //       value: "kredit",
  //     },
  //   ],
  // },
  {
    valueName: "gender",
    fieldType: "select",
    defaultValue: "",
    label: "Gender",
    placeholder: "Pilih Gender",
    items: [
      {
        text: "Pria",
        value: "pria",
      },
      {
        text: "Wanita",
        value: "wanita",
      },
    ],
    validations: {
      required: true,
    },
  },
  // {
  //   valueName: "status",
  //   fieldType: "checkbox",
  //   label: "Pilih Status",
  //   checkboxItem: [
  //     {
  //       text: "Member",
  //       value: "member",
  //     },
  //     {
  //       text: "Bukan Member",
  //       value: "bukanMember",
  //     },
  //     {
  //       text: "Karyawan",
  //       value: "karyawan",
  //     },
  //   ],
  // },
  {
    valueName: "password",
    fieldType: "textField",
    defaultValue: "",
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    validations: {
      required: true,
      minLength: 6,
    },
  },
  {
    valueName: "confirmPassword",
    fieldType: "textField",
    defaultValue: "",
    type: "password",
    label: "Confirm Password",
    placeholder: "Enter Confirm Password",
    validations: {
      required: true,
      minLength: 6,
      sameAs: "password",
    },
  },
  // {
  //   valueName: "activate",
  //   fieldType: "switch",
  //   label: "Activate Acount",
  //   placeholder: ["Active", "Not Active"],
  // },
];

export const register: Fields[] = [
  {
    valueName: "country",
    fieldType: "select",
    defaultValue: "ID",
    label: "Select Country",
    placeholder: "Select Country",
    items: countryPhoneCode.map((item) => {
      return {
        text: `${item.name} (${item.dial_code})`,
        value: item.code,
      };
    }),
    // items: [
    //   {
    //     text: "Pria",
    //     value: "pria",
    //   },
    //   {
    //     text: "Wanita",
    //     value: "wanita",
    //   },
    // ],
    // validations: {
    //   required: true,
    // },
  },
  {
    valueName: "phone",
    fieldType: "textField",
    type: "tel",
    label: "Nomor Hp",
    placeholder: "Masukkan Nomor Hp Anda",
    validations: {
      required: true,
      minLength: 9,
      numeric: true,
    },
  },
  {
    valueName: "password",
    fieldType: "textField",
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    validations: {
      required: true,
      minLength: 6,
    },
  },
];
export const login: Fields[] = [
  {
    valueName: "phone",
    fieldType: "textField",
    type: "tel",
    label: "Nomor Hp",
    placeholder: "Masukkan Nomor Hp Anda",
    validations: {
      required: true,
      minLength: 9,
      numeric: true,
    },
  },
  {
    valueName: "password",
    fieldType: "textField",
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    validations: {
      required: true,
      minLength: 6,
    },
  },
];

export const otpCode: Fields[] = [
  {
    valueName: "otp",
    fieldType: "textField",
    defaultValue: null,
    type: "number",
    label: "OTP Code",
    placeholder: "Enter OTP Code",
    validations: {
      required: true,
      minLength: 4,
      numeric: true,
    },
  },
];
export const requestOtp: Fields[] = [
  {
    valueName: "phone",
    fieldType: "textField",
    defaultValue: null,
    type: "number",
    label: "Phone Number",
    placeholder: "6282264319643",
    validations: {
      required: true,
      minLength: 9,
      numeric: true,
    },
  },
];
export const registerRemove: Fields[] = [
  {
    valueName: "phone",
    fieldType: "textField",
    defaultValue: null,
    type: "number",
    label: "Phone Number",
    placeholder: "6282264319643",
    validations: {
      required: true,
      minLength: 9,
      numeric: true,
    },
  },
];

export const profileField: Fields[] = [
  {
    valueName: "name",
    fieldType: "textField",
    defaultValue: "",
    type: "text",
    label: "Name",
    placeholder: "Ian Febi",
    validations: {
      required: true,
    },
  },
  {
    valueName: "gender",
    fieldType: "select",
    defaultValue: "",
    label: "Gender",
    placeholder: "Select Gender",
    items: [
      {
        text: "Male",
        value: 0,
      },
      {
        text: "Female",
        value: 1,
      },
    ],
    validations: {
      required: true,
    },
  },
  {
    valueName: "birthday",
    fieldType: "date",
    defaultValue: "",
    type: "birthday",
    label: "Date of Birth",
    placeholder: "2000-02-14",
    validations: {
      required: true,
    },
  },
  {
    valueName: "hometown",
    fieldType: "textField",
    defaultValue: "",
    type: "alpha",
    label: "Home Town",
    placeholder: "Yogyakarta",
    validations: {
      required: true,
    },
  },
  {
    valueName: "bio",
    fieldType: "textarea",
    defaultValue: "",
    type: "text",
    label: "",
    placeholder: "Write Youre bio here",
    validations: {
      required: true,
    },
  },
];

export const careerFields: Fields[] = [
  {
    valueName: "position",
    fieldType: "textField",
    defaultValue: "",
    type: "text",
    label: "Position",
    placeholder: "Front End Developer",
  },
  {
    valueName: "company_name",
    fieldType: "textField",
    defaultValue: "",
    type: "text",
    label: "Company Name",
    placeholder: "Privy",
    validations: {
      required: true,
    },
  },
  {
    valueName: "starting_from",
    fieldType: "date",
    defaultValue: "",
    type: "birthday",
    label: "Start From",
    placeholder: "2000-02-14",
    validations: {
      required: true,
    },
  },
  {
    valueName: "ending_in",
    fieldType: "date",
    defaultValue: "",
    type: "birthday",
    label: "Ends In",
    placeholder: "2000-02-14",
    validations: {
      required: true,
    },
  },
];
export const educationFields: Fields[] = [
  {
    valueName: "school_name",
    fieldType: "textField",
    defaultValue: "",
    type: "text",
    label: "School Name",
    placeholder: "Sma N 1 Karangmojo",
    validations: {
      required: true,
    },
  },
  {
    valueName: "graduation_time",
    fieldType: "date",
    defaultValue: "",
    type: "birthday",
    label: "Graduation Time",
    placeholder: "2000-02-14",
    validations: {
      required: true,
    },
  },
];
