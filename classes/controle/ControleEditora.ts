import { Editora } from "../modelo/Editora";

export class ControleEditora {
    private editoras: { codEditora: number; nome: string }[];
  
    constructor() {
      // Inicializando com alguns dados fictícios
      this.editoras = [
        { codEditora: 1, nome: 'Record' },
        { codEditora: 2, nome: 'Luz da Sabedoria' },
        { codEditora: 3, nome: 'Armagedon' },
      ];
    }

    // Método para retornar o nome da editora com base no código, usando filter
    getNomeEditora(codEditora: number): string | undefined {
        const editora = this.editoras
        .filter(e => e.codEditora === codEditora)
        .map(e => e.nome)[0]; // Usamos [0] para pegar o primeiro resultado

        return editora; // Pode ser string ou undefined se não encontrar
    }
  
    // Método para retornar todas as editoras
    getEditoras(): { codEditora: number; nome: string }[] {
      return this.editoras;
    }
}