const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

let notes = [];

function render() {
    notesList.textContent = "";

    notes.forEach(function(note) {
        const listItem = document.createElement("li");
        listItem.classList.add(
            "category-" + note.category.toLowerCase()
        );

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = note.category;

        const date = document.createElement("small");
        date.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(date);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });
}

noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    render();

    noteInput.value = "";
});