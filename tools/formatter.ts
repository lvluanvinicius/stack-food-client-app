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

export function formatCPFOrCNPJ(value: string | number): string {
  const onlyNumbers = String(value).replace(/\D/g, "");

  if (onlyNumbers.length === 11) {
    // Format as CPF: 000.000.000-00
    return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (onlyNumbers.length === 14) {
    // Format as CNPJ: 00.000.000/0000-00
    return onlyNumbers.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  }

  // Return raw input if it's neither valid CPF nor CNPJ
  return onlyNumbers;
}

export function formatterCep(cep: string | number): string {
  // 1. Converte para string e remove tudo que não for dígito
  const onlyNumbers = String(cep).replace(/\D/g, "");

  // 2. Limita a 8 caracteres e aplica a máscara do CEP
  return onlyNumbers.slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
}
