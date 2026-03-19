function addFlashcard() {
    const row = document.createElement("div");
    row.className = "flashcard-row";
    const question = document.createElement("input");
    question.type = "text";
    question.placeholder = "Question";
    const answer = document.createElement("input");
    answer.type = "text";
    answer.placeholder = "Answer";
    row.appendChild(question);
    row.appendChild(answer);
    document.querySelector(".container").appendChild(row);

    
} 