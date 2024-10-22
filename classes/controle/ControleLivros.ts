import { Livro } from "../modelo/Livro";

export class ControleLivros {
    private livros: { codigo: number; codEditora: number; titulo: string; resumo: string; autores: string[] }[];
  
    constructor() {
      // Iniciando com dados fictícios para testar
      this.livros = [
        { codigo: 1, codEditora: 1, titulo: 'A volta dos que não foram', resumo: 'Eles queriam ir, mas não foram. Mas quando chegaram, viram que nem sair sairam.', autores: ["Abraão e Abraãozinho"] },
        { codigo: 2, codEditora: 1, titulo: 'O corte famoso do cabelo do careca', resumo: 'Aquela careca cheia de cabeleira, assediada pelos maiores cabelereiros, enfim teve o seu corte realizado.', autores: ["Caja e Cajazinho"] },
        { codigo: 3, codEditora: 2, titulo: 'Assassinato sem morte', resumo: 'Rollie Tyler é um profissional em efeitos especiais para filmes de baixo orçamento em Hollywood. Quando o gângster Nicholas DeFranco fica prestes a testemunhar em corte contra seus ex-chefes, agentes do FBI contratam Rollie para simular o assassinato de Nicholas com seus efeitos especiais, temendo que ele estivesse correndo risco de vida.', autores: ["Robert T. Megginson", "Gregory Fleeman"] },
      ];
    }
  
    // Lista livros
    getLivros(): { codigo: number; codEditora: number; titulo: string; resumo: string; autores: string[] }[] {
      return this.livros;
    }

    // Adcionar livro
    incluir(livro: Livro):void {
      livro.codigo = this.livros.length > 0 ? Math.max(...this.livros.map(l => l.codigo)) + 1 : 1;
      this.livros.push(livro);
      console.log('Livro a ser incluído:', livro);
    }

    // Excluir livro
    excluir(codigo: number): void {
        const indice = this.livros.findIndex(livro => livro.codigo === codigo);
        if (indice !== -1) {
            this.livros.splice(indice, 1);
        }
    }
}