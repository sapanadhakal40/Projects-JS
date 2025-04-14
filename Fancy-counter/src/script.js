const incrementButton = document.querySelector('#incrementButton');
const decrementButton = document.querySelector('#decrementButton');
const resettButton = document.querySelector('#resettButton');

let count= 0;

incrementButton.addEventListener('click', () => {
   count++;
   counter.textContent = count;
});

decrementButton.addEventListener('click', () => {
    if (count > 0){
    count--;
    counter.textContent = count;
    }
 });

 resetButton.addEventListener('click', () => {
    count= 0;
    counter.textContent = count;
 });
