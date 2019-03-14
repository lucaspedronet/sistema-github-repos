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

  /**
   * @método addRepositry()
   * @document = { autohr: Lucas Pedro }
   */

  async addRepository(event) {
    event.preventDefault();
    const respo = this.inpuEl.value;

    try {
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

    this.render();
  }

  /**
   * @método render() resposavel por renderizar a lista de repositórios.
   **/
  render() {
    this.listEl.innerHTML = "";
    this.repository.map(repo => {
      let liEl = document.createElement("li");
      let imgEl = document.createElement("img");
      let strongEl = document.createElement("strong");
      let paragrafEl = document.createElement("p");
      let linkEl = document.createElement("a");

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

      liEl.appendChild(imgEl);
      liEl.appendChild(strongEl);
      liEl.appendChild(paragrafEl);
      liEl.appendChild(linkEl);
      this.listEl.appendChild(liEl);
    });
  }
}

new App();
