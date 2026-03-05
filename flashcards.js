async function flashcardClick(){
    let flashcardContent = await getFlashcard(set_id);
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
const params = new URLSearchParams(window.location.search);
const set_id = params.get('setId');
async function getText(){
    
    let flashcardContent = await getFlashcard(set_id);
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
    let flashcardContent = await getFlashcard(set_id);
    if (flashcard_num < flashcardContent.length - 1) {
        flashcard_num++;
    }
    await getText();
    let flashcard = document.querySelector(".flashcard");
    flashcard.textContent = flashcardContent[flashcard_num].question;

}

async function getFlashcard(set_id){
    let flashcardContent = await fetch(`http://localhost:3000/api/cards?`);
    flashcardContent = await flashcardContent.json();
    flashcardContent = flashcardContent.filter(card => card.set_id == set_id);

    return flashcardContent;
}

async function numFlashCardDisplay(){
    let text = document.querySelector("#flashcard-number");
    text.textContent = flashcard_num + 1 + "/" + await getFlashcard(set_id).then(cards => cards.length);
    
}

async function flashcardPrevious(){
    let flashcardContent = await getFlashcard(set_id);
    if (flashcard_num > 0) {
        flashcard_num--;
    }
    await getText();
    let flashcard = document.querySelector(".flashcard");
    flashcard.textContent = flashcardContent[flashcard_num].question;
}

