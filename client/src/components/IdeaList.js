import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas();
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  getIdeas = async () => {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  };

  async deleteIdea(ideaId) {
    try {
      //Delete from server
      const res = await IdeasApi.deleteIdea(ideaId);
      //Delete from DOM
      this._ideas.filter((idea) => idea.id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert('Unauthorized Delete');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return `
          <div class="card" data-id="${idea._id}">
      ${deleteBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag tag-${idea.tag.toLowerCase()}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
