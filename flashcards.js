async function flashcardClick(){
    let flashcardContent = await getFlashcard();
    if (!flashcardContent.length) {
        return;
    }

    let flashcard = document.querySelector(".flashcard");
    let showingQuestion = flashcard.textContent.trim() === flashcardContent[flashcard_num].question;

    if (showingQuestion) {
        flashcard.textContent = flashcardContent[flashcard_num].answer;
        console.log(flashcardContent[flashcard_num].answer);

    } else {
        flashcard.textContent = flashcardContent[flashcard_num].question;
        console.log(flashcardContent[flashcard_num].question);
    }
    console.log("Flashcard clicked");
}
let flashcard_num = 0;
async function getText(){
    let flashcardContent = await getFlashcard();
    if (!flashcardContent.length) {
        return "";
    }
    numFlashCardDisplay();
    let flashcardWords = flashcardContent[flashcard_num].question;
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

async function flashcardNext(){
    let flashcardContent = await getFlashcard()
    if (flashcard_num < flashcardContent.length - 1) {
        flashcard_num++;
    }
    await getText();
    let flashcard = document.querySelector(".flashcard");
    flashcard.textContent = flashcardContent[flashcard_num].question;

}

async function getFlashcard(){
    let flashcardContent = await fetch('http://localhost:3000/api/cards');
    flashcardContent = await flashcardContent.json();
    return flashcardContent;
}

async function numFlashCardDisplay(){
    let text = document.querySelector("#flashcard-number");
    text.textContent = flashcard_num + 1 + "/" + await getFlashcard().then(cards => cards.length);
    
}

async function flashcardPrevious(){
    let flashcardContent = await getFlashcard();
    if (flashcard_num > 0) {
        flashcard_num--;
    }
    await getText();
    let flashcard = document.querySelector(".flashcard");
    flashcard.textContent = flashcardContent[flashcard_num].question;
}

