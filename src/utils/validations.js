import * as Yup from 'yup';

const dniRegex = /^[0-9]{8}$/;
const minAge = 18;

const isAdult = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age >= minAge;
};

export const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return (strength / 5) * 100;
  };

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  dni: Yup.string()
    .matches(dniRegex, 'El DNI debe tener 8 dígitos')
    .required('El DNI es obligatorio'),
  gender: Yup.string().required('El género es obligatorio'),
  birthDate: Yup.date()
    .nullable()
    .required('La fecha de nacimiento es obligatoria')
    .test('is-adult', 'Debes ser mayor de 18 años', isAdult),
  email: Yup.string().email('El email es inválido').required('El email es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(/[0-9]/, 'La contraseña debe tener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe tener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
});
