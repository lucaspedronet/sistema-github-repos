import api from "./server/api";

class App {
  constructor() {
    this.repository = [];
    this.formEl = document.getElementById("repo-form");
    this.listEl = document.getElementById("repo-list");
    this.inpuEl = document.getElementById("input");
    this.registerHandlers();
  }
  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  async addRepository(event) {
    event.preventDefault();
    const respo = this.inpuEl.value;

    try {
      const data = await api.get(`/repos/${respo}`);
      console.log(data);
    } catch (error) {
      console.warn(error);
    }

    this.repository.push({});

    this.render();
  }

  render() {
    this.listEl.innerHTML = "";
    this.repository.map(repo => {
      let liEl = document.createElement("li");
      liEl.appendChild(document.createTextNode(repo.name));
      this.listEl.appendChild(liEl);
    });
  }
}

new App();

// class App {
//   constructor(nome = null, idade = null) {
//     this.nome = nome;
//     this.idade = idade;
//   }
//   getNome() {
//     return this.nome;
//   }
//   getIdade() {
//     return this.idade;
//   }
//   setNome(nome) {
//     this.nome = nome;
//   }
//   setIdade(idade) {
//     this.idade = idade;
//   }
// }

// const p = new App("João Pedo", "27");
// // console.log(p.nome, p.idade);

// console.log(p.getNome());
// console.log(p.getIdade());
// p.setNome("João Pedro");
// p.setIdade(25);
// console.log(p.getNome());
// console.log(p.getIdade());
