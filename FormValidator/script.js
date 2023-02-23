const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input errormessage
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message;
}

// Show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check if email is valid
function checkEmail(input){
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(re.test(input.value.trim())){
        showSuccess(input)
    }
    else{
        showError(input, `${getFieldName(input)} is not valid`)
    }

    
}

// Check required fields
function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(!input.value.trim()){
            showError(input, `${getFieldName(input)} is required`);
        }
        else{
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max){
    if(input.value.length<min){
        showError(input, `${getFieldName(input)} should be longer then ${min}`);
    }
    else if(input.value.length>max){
        showError(input, `${getFieldName(input)} should be shorter then ${max}`);
    }
    else{
        showSuccess(input);
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match')
    }
}

// Get field name
    function getFieldName(input){
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
// Event listener
form.addEventListener('submit', e =>
    {
       e.preventDefault();
       checkRequired([username, email, password, password2])
       checkLength(username, 3, 15);
       checkLength(password, 6, 25);
       checkEmail(email);
       checkPasswordsMatch(password,password2)
       checkLength(password2, 6, 25);
    }
);