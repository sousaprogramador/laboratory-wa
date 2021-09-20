export default interface ICreateExamDTO {
  name: string;
  type: 'analise clinica' | 'imagem';
  laboratory_id : number;
}
