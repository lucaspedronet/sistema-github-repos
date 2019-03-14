import api from "./server/api";

class App {
  constructor() {
    this.repository = [];
    this.formEl = document.getElementById("repo-form");
    this.listEl = document.getElementById("repo-list");
    this.inputEl = document.getElementById("input");
    this.registerHandlers();
  }
  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  isLoading(load = true) {
    if (load) {
      return document
        .getElementById("loading")
        .appendChild(document.createTextNode("Carregando..."));
    }
    document.getElementById("loading").innerHTML = "";
  }

  async addRepository(event) {
    event.preventDefault();
    const respo = this.inputEl.value;
    this.inputEl.value = "";

    try {
      this.isLoading();
      const resposta = await api.get(`/repos/${respo}`);
      const {
        name,
        description,
        owner: { avatar_url, html_url }
      } = resposta.data;

      this.repository.push(
        Object.freeze({
          name,
          description,
          avatar_url,
          html_url
        })
      );
    } catch (error) {
      console.warn(error);
    }
    this.isLoading(false);

    this.render();
  }

  excluirRepository(id) {
    this.repository.splice(id, 1);
    this.render();
  }

  /**
   * @método render() resposavel por renderizar a lista de repositórios.
   **/
  render() {
    this.listEl.innerHTML = "";
    this.repository.map(repo => {
      let itemEl = document.createElement("li");
      let imgEl = document.createElement("img");
      let strongEl = document.createElement("strong");
      let paragrafEl = document.createElement("p");
      let linkEl = document.createElement("a");
      let buttonEl = document.createElement("button");

      /**
       * @SET_ATRIBUTE {Setando as protiedades de img em imgEl}
       */
      imgEl.setAttribute("src", repo.avatar_url);
      imgEl.setAttribute("alt", document.createTextNode(repo.avatar_url));

      strongEl.appendChild(document.createTextNode(repo.name));
      paragrafEl.appendChild(document.createTextNode(repo.description));

      linkEl.setAttribute("target", "blank");
      linkEl.setAttribute("href", repo.html_url);
      linkEl.appendChild(document.createTextNode("Acessar"));

      buttonEl.setAttribute("id", this.repository.length);
      buttonEl.setAttribute("title", "Excluir");
      buttonEl.appendChild(document.createTextNode("Excluir"));

      buttonEl.onclick = () => this.excluirRepository(repo.id);

      itemEl.appendChild(imgEl);
      itemEl.appendChild(strongEl);
      itemEl.appendChild(paragrafEl);
      itemEl.appendChild(linkEl);
      itemEl.appendChild(buttonEl);
      this.listEl.appendChild(liEl);
    });
  }
}

new App();
