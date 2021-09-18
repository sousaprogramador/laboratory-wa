type exam = {
  name: string;
  type: 'analise clinica' | 'imagem';
};

export const clinicalExam = {
  name: 'exame clinico',
  type: 'analise clinica',
} as exam;

export const imageExam = {
  name: 'image exam',
  type: 'imagem',
} as exam;
