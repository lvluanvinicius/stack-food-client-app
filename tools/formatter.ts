export function formatPhone(value: string | number): string {
  const onlyNumbers = String(value).replace(/\D/g, "");

  if (onlyNumbers.length === 10) {
    // Landline: (XX) XXXX-XXXX
    return onlyNumbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  if (onlyNumbers.length === 11) {
    // Mobile: (XX) 9XXXX-XXXX
    return onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return onlyNumbers;
}
