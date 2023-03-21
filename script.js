const inputText = document.getElementById("inputText");
const summarizeBtn = document.getElementById("summarizeBtn");
const outputText = document.getElementById("outputText");
const toggleTheme = document.getElementById("toggleTheme");

summarizeBtn.addEventListener("click", async () => {
    const text = inputText.value;
    const summary = await summarizeText(text);
    outputText.textContent = summary;
});

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

});

const apiKey = "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";

async function summarizeText(text) {
    const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: `Please summarize the following text:\n\n${text}\n\nSummary:`,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.5
        })
    });

    const data = await response.json();
    const summary = data.choices[0].text.trim();
    return summary;
}