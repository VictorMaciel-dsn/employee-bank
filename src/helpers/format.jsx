export const formatarCep = (cep) => {
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  return cep;
};

export const formatarCpf = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};

export const formatarData = (data) => {
  data = data.replace(/\D/g, "");
  if (data.length <= 2) {
    return data;
  }
  if (data.length <= 4) {
    data = data.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    return data;
  }
  data = data.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  return data;
};
