const textareaElement = document.querySelector(".textarea");
const charsNumberElement = document.querySelector(".stat__number--characters");
const twitterNumberElement = document.querySelector(".stat__number--twitter");
const facebookNumberElement = document.querySelector(".stat__number--facebook");
const wordsNumberElement = document.querySelector(".stat__number--words");

function inputhandler() {   

        // console.log(textareaElement.value.length);
        //input validation
        if (textareaElement.value.includes("  ")) {
            alert("You can't use that.");
            textareaElement.value = textareaElement.value.replace("  ", '');
        }
        
        let numberofwords = textareaElement.value.split(' ').length;
        if (textareaElement.value.length === 0) {
            numberofwords = 0;
        }
        const numberofchars = textareaElement.value.length;
        const twitterCharsLeft = 280 - numberofchars;
        const facebookCharsLeft = 2200 - numberofchars;
        
        //for visual limit indicator
        if (twitterCharsLeft < 0) {
            twitterNumberElement.classList.add("stat__number--limit");
        }else {
            twitterNumberElement.classList.remove("stat__number--limit");
        }
        if (facebookCharsLeft < 0) {
            facebookNumberElement.classList.add("stat__number--limit");
        }else {
            facebookNumberElement.classList.remove("stat__number--limit");
        }
        
        charsNumberElement.textContent = numberofchars;
        twitterNumberElement.textContent = twitterCharsLeft;
        facebookNumberElement.textContent = facebookCharsLeft;
        wordsNumberElement.textContent = numberofwords;
        }

        textareaElement.addEventListener("input", inputhandler);