// import {ImageLibraryOptions} from 'react-native-image-picker';
import * as changeCase from "change-case";
export const genders = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
];
export const capitalizeSentence = (value: string) =>
  changeCase.capitalCase(value ?? " ");
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern =
  /^(080|081|090|070|091|071|090|092|80|81|90|70|91|71|90|92|\+234|234)[0-9]{8}$/;

export const passwordPattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,64}$/;

export const nairaSign = "₦";
export const companyName = "Flightly";
