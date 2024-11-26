import IdeasApi from '../services/ideasApi';
import IdeaList from '../components/IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._ideaForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._ideaForm.elements.username.value ||
      !this._ideaForm.elements.text.value ||
      !this._ideaForm.elements.tag.value
    ) {
      alert('Please fill in the fields');
      return;
    }

    localStorage.setItem('username', this._ideaForm.elements.username.value);

    const idea = {
      username: this._ideaForm.elements.username.value,
      text: this._ideaForm.elements.text.value,
      tag: this._ideaForm.elements.tag.value,
    };
    //Add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    //Add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);

    //Clear fields
    this._ideaForm.elements.username.value = '';
    this._ideaForm.elements.text.value = '';
    this._ideaForm.elements.tag.value = '';
    this.render();

    document.dispatchEvent(new Event('closemodal'));
  }

  render() {
    this._formModal.innerHTML = `
     <form id="idea-form">
            <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" 
            value="${
              localStorage.getItem('username')
                ? localStorage.getItem('username')
                : ''
            }"/>
           
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
    </form>`;

    this._ideaForm = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default new IdeaForm();
