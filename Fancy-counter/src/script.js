const incrementButton = document.querySelector('#incrementButton');
const decrementButton = document.querySelector('#decrementButton');
const resetButton = document.querySelector('#resetButton');
const counter = document.querySelector('#counter');
const counterBox = document.querySelector('.counter-box');
const counterTitle = document.querySelector('.counter__title');

let count= 0;

incrementButton.addEventListener('click', () => {
   if (count < 5){
   count++;
   counter.textContent = count;

   counterBox?.classList.remove('counter--limit');
   counterTitle && (counterTitle.textContent = 'Fancy Counter');

   decrementButton.disabled = false;
   }
   if (count === 5){
    incrementButton.disabled = true;
    decrementButton.disabled = false;

    counterBox?.classList.add('counter--limit');
    counterTitle && (counterTitle.innerHTML = 'Limit Reached! Buy <b>Pro</b> for >5');
   }
});


decrementButton.addEventListener('click', () => {
    if (count > 0){
    count--;
    counter.textContent = count;

    incrementButton.disabled = false;
    decrementButton.disabled = false;

    counterBox?.classList.remove('counter--limit');
    counterTitle && (counterTitle.textContent = 'Fancy Counter');
    }
 });

 resetButton.addEventListener('click', () => {
    count= 0;
    counter.textContent = count;

    incrementButton.disabled = false;
    decrementButton.disabled = false;
  
    counterBox?.classList.remove('counter--limit');
    counterTitle && (counterTitle.textContent = 'Fancy Counter');
  
    resetButton.blur();
 });
