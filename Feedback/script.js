//Global
const MAX_NUM_CHAR = 150; // Maximum number of characters allowed in the textarea
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api'; 
//counter
const textareaElement = document.querySelector(".form__textarea");
const formElement = document.querySelector(".form");
const counterElement = document.querySelector(".counter");
const feedbackListElement = document.querySelector(".feedbacks");
const submitBtnElement = document.querySelector(".submit-btn");
const spinnerElement = document.querySelector('.spinner');
const hashtagListElement = document.querySelector(".hashtags");

const renderFeedbackItem = feedbackItem => {
    const feedbackItemHTML = `
<li class="feedback">
    <button class="upvote">
     <i class="fa-solid fa-caret-up upvote__icon"></i>
     <span class="upvote__count">${feedbackItem.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${feedbackItem.company}</p>
        <p class="feedback__text">${feedbackItem.text}</p>
    </div>
    <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
</li>
`;

    feedbackListElement.insertAdjacentHTML("beforeend", feedbackItemHTML);  // Insert the new feedback item at the beginning
};

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
     
    formElement.classList.add(className);
    //remove visual indicator 
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
const upvoteCount = 0;
const daysAgo = 0;

//create a new feedback item object
const feedbackItem = {
    upvoteCount: upvoteCount,
    company: company,
    badgeLetter: badgeLetter,
    daysAgo: daysAgo,
    text: text
};

renderFeedbackItem(feedbackItem); // Render the new feedback item in the list

// Send the feedback item to the server
fetch(`${BASE_API_URL}/feedbacks`, {
    method: 'POST',
    body: JSON.stringify(feedbackItem),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    // Convert the feedback item object to a JSON string
}).then(response => {
    if (!response.ok) {
      console.log('something went wrong');
      return;
    }
    console.log('Feedback item submitted successfully!');
}).catch(error => console.log(error));
// Clear the textarea after submission
textareaElement.value = ""; 

//blur submit button
submitBtnElement.blur(); // Remove focus from the submit button

// Reset the character counter
counterElement.textContent = MAX_NUM_CHAR; // Reset the counter to
};

formElement.addEventListener("submit", submitHandler);


//FEEDBACK LIST COMPONENT

const clickHandler = (event) => {
    // console.log('event');
    //get clicked HTML element
    
    const clickedElement = event.target;
    // console.log(clickedElement);

    //determine if user intended to upvote or expand
    const upvoteIntention = clickedElement.className.includes("upvote");
    if (upvoteIntention) {
        //get closest upvote button
        const upvoteButtonElement = clickedElement.closest(".upvote");

        //disable upvote button(prevent multiple clicks)
        upvoteButtonElement.disabled = true;
        
        //select upvote count element
        const upvoteCountElement = upvoteButtonElement.querySelector(".upvote__count");

        let upvoteCount = +upvoteCountElement.textContent; // Convert the text content to a number

        upvoteCountElement.textContent = ++upvoteCount;

        //increment by 1
        // upvoteCount = upvoteCount + 1;

        // //set upvote count to new value
        // upvoteCountElement.textContent = upvoteCount;

        // //get current display upvote count as number
        // const upvoteCount = upvoteCountElement.textContent;
        // console.log(typeof upvoteCount);


    }else {
        //expand clicked feedback item
    clickedElement.closest(".feedback").classList.toggle("feedback--expanded");
    }
};
feedbackListElement.addEventListener("click", clickHandler);


fetch(`${BASE_API_URL}/feedbacks`)
    .then(response => response.json())
    .then(data => {
     
// iterate over each element in feedbacks array and render it in list
        data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem));
    })
    .catch(error => {
        feedbackListElement.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
    });

    //HASH TAGS COMPONENT
    const clickHandler2 = event => {
        //get clicked HTML element
        const clickedElement = event.target;
        
        //stop function execution if clicked element is not a hashtag
        if (clickedElement.className === "hashtags") return;

        const companyNameFromHashtag = clickedElement.textContent.substring(1).toLowerCase().trim(); // Remove the '#' character from the hashtag

        //iterate over each feedback item in the list
        feedbackListElement.childNodes.forEach(childNode => {
            //stop this iteration if its a childNode 
            if (childNode.nodeType === 3) return;

        //extract company name from feedback item
        const companyNameFromFeedbackItem = childNode.querySelector(".feedback__company").textContent.toLowerCase().trim();

        //remove feedback item from list if company names do not match
        if (companyNameFromHashtag !== companyNameFromFeedbackItem) {
            childNode.remove(); // Remove the feedback item from the list .for eg: if nike is not equal to macdonald then macdonalds feedback item will be removed from the list
        }
        });


        // console.log(clickedElement);
    };
        
    hashtagListElement.addEventListener("click", 
clickHandler2);