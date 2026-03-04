async function flashcardClick(){
    let flashcardContent = await fetch('http://localhost:3000/api/cards');
    flashcardContent = await flashcardContent.json();
    if (!flashcardContent.length) {
        return;
    }

    let flashcard = document.querySelector(".flashcard");
    let showingQuestion = flashcard.textContent.trim() === flashcardContent[0].question;

    if (showingQuestion) {
        flashcard.textContent = flashcardContent[0].answer;
        console.log(flashcardContent[0].answer);

    } else {
        flashcard.textContent = flashcardContent[0].question;
        console.log(flashcardContent[0].question);
    }
    console.log("Flashcard clicked");
}

async function getText(){
    let flashcardContent = await fetch('http://localhost:3000/api/cards');
    flashcardContent = await flashcardContent.json();
    if (!flashcardContent.length) {
        return "";
    }

    let flashcardWords = flashcardContent[0].question;
    return flashcardWords;
}

document.addEventListener("DOMContentLoaded", async () => {
    let flashcard = document.querySelector(".flashcard");
    if (!flashcard) {
        return;
    }

    flashcard.hidden = true;
    let flashcardWords = await getText();
    flashcard.textContent = flashcardWords || "No flashcards available.";
    flashcard.hidden = false;
});

