class Note {
    constructor(title, text) {
        this.ID = String(Date.now() + Math.random()) % 17;
        this.title = title;
        this.text = text;
        this.time = new Date().toLocaleString();
    }
}



function createCard(note) {
    let card = document.createElement("div");
    card.className = "cards";
    card.id = note.ID;
    card.innerHTML = `
    <h3>${note.title}</h3>
    <div id="note-text-container">${note.text}</div>
    <p>${note.time}</p>
    <button id = "delete-${note.ID}" class="delete-btn">Delete</button>`;
    return card;
}

function checkState() {
    let notesArray = JSON.parse(localStorage.getItem("notes"));

    if (notesArray == null) {
        notesArray = [];
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }

    let area = document.getElementById("notes-area");
    if (notesArray.length == 0) {
        let info = document.createElement("h4");
        info.id = "info-card";
        info.innerText = "Your notes will be shown here";
        area.insertBefore(info, document.getElementById("notes-grid"));
    }
    else {
        if (document.getElementById("info-card") != null)
            area.removeChild(document.getElementById("info-card"));
    }
}

function insertCard(card) {
    let grid = document.getElementById("notes-grid");
    grid.appendChild(card);

    document.getElementById(`delete-${card.id}`).addEventListener("click", function (event) {
        let ID = event.target.parentElement.id;

        //remove from local storage
        let notesArray = JSON.parse(localStorage.getItem("notes"));

        let index = notesArray.findIndex(x => x.cardId == ID);

        notesArray.splice(index, 1);

        localStorage.setItem("notes", JSON.stringify(notesArray));

        let grid = document.getElementById("notes-grid");
        grid.removeChild(event.target.parentElement);

        checkState();
    });
}

function retrieveFromLocalStorage() {
    let notesArray = JSON.parse(localStorage.getItem("notes"));
    if (notesArray != null) {
        for (let i = 0; i < notesArray.length; i++) {
            let note = notesArray[i];
            insertCard(createCard(note));
        }
    }
}

checkState();
retrieveFromLocalStorage();

document.getElementById("addNote-btn").addEventListener("click", function () {

    let headingArea = document.getElementById("heading-text-area");
    let textArea = document.getElementById("text-area");

    let note = new Note(headingArea.value, textArea.value);

    let notesArray = JSON.parse(localStorage.getItem("notes"));

    notesArray.push(note);
    localStorage.setItem("notes", JSON.stringify(notesArray));

    checkState();

    insertCard(createCard(note));

    headingArea.value = "";
    textArea.value = "";
});
