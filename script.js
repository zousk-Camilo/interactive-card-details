//DOM variables 

const $inputName = document.querySelector('.cardholder__input__name');
const $cardNumber = document.querySelector('.cardholder__input__number');
const $inputMonth = document.querySelector('.exp-date__input__month');
const $inputYear = document.querySelector('.exp-date__input__year');
const $inputCVC = document.querySelector('.input__cvc');
const $numberInCard = document.querySelector('.card__number');
const $nameInCard = document.querySelector('.card__name');
const $dateInCard = document.querySelector('.card__date');
const $cvcInCard = document.querySelector('.back__cvc');
const $submit = document.querySelector('.submit');
const $formWraper = document.querySelector('.form__wraper');

const $errorMessageNumber = document.querySelector('.error__message__number');

const number = [1,2,3,4,5,6,7,8,9,0];
//arr variables 

const regExp = {
    name: /[A-Za-záãäéëêíîóöúüñÑçÁÉÍÓÚ]{3,}\s[A-Za-záãäéëêíîóöúüñÑçÁÉÍÓÚ]{3,}\s?[A-Za-záãäéëêíîóöúüñÑçÁÉÍÓÚ]{3,}\s?[A-Za-záãäéëêíîóöúüñÑçÁÉÍÓÚ]{3,}\s?$/,
    cardNumber: /^(?:(\d{4}\s?){4}|(\d{4,6}\s?){3})$/
}

const fieldValidations = {
    name: false,
    number: false
}

const maskMonth = '##';





//functions 
//cardName validation
$inputName.addEventListener('keyup',e=>{
    console.log($inputName.value)
    $nameInCard.textContent = $inputName.value;
    if(regExp.name.test($inputName.value)){
        fieldValidations.name = true
    }
});

//cardNumber validation

$cardNumber.addEventListener('keyup', ()=>{
    $numberInCard.textContent = $cardNumber.value;
    if(regExp.cardNumber.test($cardNumber.value) && $cardNumber.value.length == 19){
        fieldValidations.number = true;
        $errorMessageNumber.classList.remove('error__message__number-active');
    }else{
        $errorMessageNumber.classList.add('error__message__number-active');
    }
});


//month

let monthMask = '**';
let monthArr = [];

$inputMonth.addEventListener('keydown', (e) => {
    if(e.key == 'tab'){
        return;
    }
    e.preventDefault()
    handleValidation(monthMask, e.key, monthArr);
    $inputMonth.value = monthArr.join('');
    $dateInCard.textContent = `${$inputMonth.value}/`
    console.log($inputMonth.value.length)
});

//year 

let yearMask = '**';
let yearArr = [];

$inputYear.addEventListener('keydown', e=>{
    if(e.key === 'tab'){
        return
    }
    e.preventDefault();

    handleValidation(yearMask, e.key, yearArr)
    $inputYear.value = yearArr.join('');
    $dateInCard.textContent = `${$inputMonth.value}/${$inputYear.value}`
});


//cvc
let cvcMask = '***'
let cvcArr = [];

$inputCVC.addEventListener('keydown', e=>{
    if(e.key == 'tab'){
        return
    }
    e.preventDefault();

    handleValidation(cvcMask,e.key,cvcArr);
    $inputCVC.value = cvcArr.join('');
    $cvcInCard.textContent = $inputCVC.value;
})


function handleValidation(mask, key, arr){
    let numbers = ['1','2','3','5','6','7','8','9','0'];
    if(key == 'Backspace' && arr.length > 0){
        arr.pop();
        return;
    }else if(numbers.includes(key) && arr.length < mask.length){
        arr.push(key);
        console.log(arr);
    }
}


$submit.addEventListener('click', e=>{
    if(fieldValidations.name && fieldValidations.number && $inputCVC.value.length === 3 && $inputMonth.value.length === 2 && $inputYear.value.length === 2){
        sendData();
    }
    
})

//
 function sendData(){
        let html =  `
    <div class="wrap__state__complete-modal">
        <img src="./images/icon-complete.svg" alt="icon-complete">
        <p class="thanks">THANK YOU!</p>
        <p class="notification">We have added your card details</p>
        <input type="submit" class="continue" value = "Continue">
      </div>`
        $formWraper.innerHTML = html
    
}