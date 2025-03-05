const calculateAge = (birthDate) => {
  if (!birthDate) return "Fecha de nacimiento no asignada";
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    return age - 1;
  }

  return age;
};

export default calculateAge;
