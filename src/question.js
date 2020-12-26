export class Question {
  static async create(question) {
    const response = (
      await fetch(
        "https://questions-bf7fb-default-rtdb.europe-west1.firebasedatabase.app/questions.json",
        {
          method: "POST",
          body: JSON.stringify(question),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).json();
    question.id = await response.name;
    await addToLocalStorage(question);
    Question.renderList();
  }
  static toHTML(questions){
      if (questions.length){
          return `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
      }
      return `<p>No questions yet.</p>`
  }
  static async fetch(token) {
    if (!token) {
      throw new Error(`<p class="error">You have not token</p>`);
    }
    const resp = (
      await fetch(
        `https://questions-bf7fb-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`
      )
    ).json();
    const questions = await resp;
    if (questions?.error) {
      throw new Error(`<p class="error">${questions.error}</p>`);
    }
    return questions
      ? Object.keys(questions).map((key) => ({
          ...questions[key],
          id: key,
        }))
      : [];
  }
  static renderList() {
    const questions = getQuestionsFromLocalStorage();
    const html = questions.length
      ? questions.map(toCard).join("")
      : `<div class="mui--text-headline">Вы ничего не спрашивали</div>`;
    const list = document.getElementById("list");
    list.innerHTML = html;
  }
}

const getQuestionsFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("questions") || "[]");

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}
function toCard(question) {
  return `<div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
          </div>
          <div>
            ${question.text}
          </div>
          <br />`;
}
