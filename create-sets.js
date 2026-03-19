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

function saveSet() {
    console.log("Saving set...");
    const flashcards = document.querySelectorAll(".flashcard-row");
    const setData = Array.from(flashcards).map(row => {
        const [question, answer] = row.querySelectorAll("input");
        console.log("Saving flashcard:", { question: question.value, answer: answer.value });
        return { question: question.value, answer: answer.value };
    });
    console.log("Set data to save:", setData);
}