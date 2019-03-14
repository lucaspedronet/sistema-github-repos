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
