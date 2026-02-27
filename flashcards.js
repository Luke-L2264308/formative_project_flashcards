function flashcardClick(){
    let flashcard = document.querySelector(".flashcard");
    if (flashcard.textContent.includes("Question")) {
        flashcard.innerHTML = "Answer";
    } else {
        flashcard.innerHTML = "Question";
    }
    console.log("Flashcard clicked");
}

