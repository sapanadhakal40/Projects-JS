//Global
const MAX_NUM_CHAR = 150; // Maximum number of characters allowed in the textarea


//counter
const textareaElement = document.querySelector(".form__textarea");
const formElement = document.querySelector(".form");
const counterElement = document.querySelector(".counter");
const feedbackListElement = document.querySelector(".feedbacks");
const submitBtnElement = document.querySelector(".submit-btn");


const inputHandler = () => {
    const maxNumChar = MAX_NUM_CHAR; // Maximum number of characters allowed in the textarea
    const numCharTyped = textareaElement.value.length;
    // console.log(textareaElement.value.length);

const charsLeft = maxNumChar - numCharTyped;
// console.log(charsLeft);

//show number of characters left
// const counterElement = document.querySelector(".counter");
counterElement.textContent = charsLeft;
// counterElement.innerHTML = `${charsLeft} characters left`;
};
textareaElement.addEventListener("input", inputHandler);

//Form component
const showVisualIndicator = textCheck => {
     const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
     console.log('Adding class:', className);
    formElement.classList.add(className);
    setTimeout(() => {
        formElement.classList.remove(className);
    }, 2000);
};


   

// const formElement = document.querySelector(".form");
const submitHandler = event => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const text = textareaElement.value;
    // console.log(text);

//validate the form
if (text.includes('#') && text.length >= 5) {
 showVisualIndicator('valid'); 

}else{
    showVisualIndicator('invalid'); // Show the visual indicator for invalid input
    
    textareaElement.focus(); // Set focus back to the textarea
    //stop function execution
    return;
}

const hashtag = text.split(' ').find(word => word.includes("#")); 
const company = hashtag.substring(1); // Remove the '#' character from the hashtag
const badgeLetter = company.substring(0, 1).toUpperCase(); // Get the first letter of the company name and convert it to uppercase
// const hashtag ;
// const company;
// const badgeletter;
const upvoteCount = 0;
const daysLeft = 0;

const feedbackItemHTML = `
<li class="feedback">
   <button class="upvote">
    <i class="fa-solid fa-caret-up upvote__icon"></i>
    <span class="upvote__count">${upvoteCount}</span>
</button>
<section class="feedback__badge">
    <p class="feedback__letter">${badgeLetter}</p>
</section>
<div class="feedback__content">
    <p class="feedback__company">${company}</p>
    <p class="feedback__text">${text}</p>
</div>
   <p class="feedback__date">${daysLeft === 0 ? 'NEW' : `${daysLeft}d`}</p>
</li>
`;

feedbackListElement.insertAdjacentHTML("beforeend", feedbackItemHTML);  // Insert the new feedback item at the beginning of the list

// Clear the textarea after submission
textareaElement.value = ""; 

//blur submit button
submitBtnElement.blur(); // Remove focus from the submit button

// Reset the character counter
counterElement.textContent = MAX_NUM_CHAR; // Reset the counter to

};
formElement.addEventListener("submit", submitHandler);


