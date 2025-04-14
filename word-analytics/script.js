const textareaElement = document.querySelector(".textarea");
const charsNumberElement = document.querySelector(".stat__number--characters");
const twitterNumberElement = document.querySelector(".stat__number--twitter");
const facebookNumberElement = document.querySelector(".stat__number--facebook");
const wordsNumberElement = document.querySelector(".stat__number--words");



textareaElement.addEventListener("input", () => {
// console.log(textareaElement.value.length);

const numberofchars = textareaElement.value.length;
const twitterCharsLeft = 280 - numberofchars;
const facebookCharsLeft = 2200 - numberofchars;

//for visual limit indicator
if (twitterCharsLeft < 0) {
    textareaElement.classList.add("stat__number--limit");
}else {
    textareaElement.classList.remove("stat__number--limit");
}
if (facebookCharsLeft < 0) {
    textareaElement.classList.add("stat__number--limit");
}else {
    textareaElement.classList.remove("stat__number--limit");
}



charsNumberElement.textContent = numberofchars;
twitterNumberElement.textContent = twitterCharsLeft;
facebookNumberElement.textContent = facebookCharsLeft;
});
