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

async function saveSet() {
    const setName = document.querySelector("#set-name").value.trim();
    const flashcards = Array.from(document.querySelectorAll(".flashcard-row"));

    const rows = flashcards.map((row, index) => {
        const [question, answer] = row.querySelectorAll("input");
        return {
            rowNumber: index + 1,
            question: (question?.value || "").trim(),
            answer: (answer?.value || "").trim()
        };
    });

    const setData = rows.filter(card => card.question && card.answer);

    if (!setName) {
        alert("Please enter a set name.");
        return;
    }

    if (setName.length > 100) {
        alert("Set name must be 100 characters or fewer.");
        return;
    }

    if (rows.length === 0) {
        alert("Please add at least one flashcard row first.");
        return;
    }

    const incompleteRows = rows
        .filter(card => !card.question || !card.answer)
        .map(card => card.rowNumber);

    if (incompleteRows.length > 0) {
        alert(`These rows are incomplete: ${incompleteRows.join(", ")}. Please fill both question and answer.`);
        return;
    }

    const oversizedRows = rows
        .filter(card => card.question.length > 500 || card.answer.length > 500)
        .map(card => card.rowNumber);

    if (oversizedRows.length > 0) {
        alert(`Rows ${oversizedRows.join(", ")} are too long. Keep each question/answer at 500 characters or fewer.`);
        return;
    }

    if (setData.length === 0) {
        alert("Please add at least one flashcard with both question and answer.");
        return;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch("/api/sets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            signal: controller.signal,
            body: JSON.stringify({
                name: setName,
                cards: setData
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const contentType = response.headers.get("content-type") || "";
            let message = `Request failed (${response.status}).`;

            if (contentType.includes("application/json")) {
                const errorData = await response.json().catch(() => ({}));
                message = errorData.error || errorData.message || message;
            } else {
                const text = await response.text().catch(() => "");
                if (text.trim()) {
                    message = text.trim();
                }
            }

            if (response.status === 400) {
                throw new Error(`Validation error: ${message}`);
            }
            if (response.status === 401 || response.status === 403) {
                throw new Error("You are not authorized to save sets.");
            }
            if (response.status === 404) {
                throw new Error("Save endpoint not found. Check server route /api/sets.");
            }
            if (response.status >= 500) {
                throw new Error(`Server error: ${message}`);
            }

            throw new Error(message);
        }

        alert("Set saved successfully.");
        window.location.href = "your-sets.html";
    } catch (error) {
        if (error.name === "AbortError") {
            alert("Could not save set: request timed out after 10 seconds.");
            return;
        }

        if (error instanceof TypeError) {
            alert("Could not save set: network error. Make sure the local server is running.");
            return;
        }

        alert(`Could not save set: ${error.message}`);
    }
}