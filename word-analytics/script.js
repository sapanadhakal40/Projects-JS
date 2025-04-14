const textareaElement = document.querySelector(".textarea");
textareaElement.addEventListener("input", () => {
// console.log(textareaElement.value.length);

const numberofchars = textareaElement.value.length;

const charsNumberElement = document.querySelector(".stat__number--characters");
charsNumberElement.textContent = numberofchars;
});
