function addFlashcard() {
    const question = document.createElement("input");
    question.type = "text";
    question.placeholder = "Question";
    document.querySelector(".container").appendChild(question);
    const answer = document.createElement("input");
    answer.type = "text";
    answer.placeholder = "Answer";
    document.querySelector(".container").appendChild(answer);
    
}