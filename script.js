const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];

function render() {
    notesList.textContent = "";

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter(function(note) {
        return note.text.toLowerCase().includes(searchTerm);
    });

    if (filteredNotes.length === 0 && searchTerm !== "") {
        const noResults = document.createElement("li");
        noResults.textContent = "No notes match your search.";
        notesList.appendChild(noResults);
    }

    filteredNotes.forEach(function(note) {
        const listItem = document.createElement("li");

        listItem.classList.add(
            "category-" + note.category.toLowerCase()
        );

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = "Category: " + note.category;

        const date = document.createElement("small");
        date.textContent = "Created: " + note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            notes = notes.filter(function(item) {
                return item.id !== note.id;
            });

            saveNotes();
            render();
        });

        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(date);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    updateCount();
}

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + notes.length + " notes.";
    }
}

function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}

noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    saveNotes();

    errorMessage.textContent = "";
    noteInput.value = "";

    render();
});

searchInput.addEventListener("input", function() {
    render();
});

render();