window.onload = function () {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    // Show error outline

    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    // Show success outline

    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    // check required details

    function checkRequired(inputArr) {
        inputArr.forEach(i => {
            if (i.value === '') {
                console.log(i.id);
                showError(i, `${getFieldName(i)} is required`);
            } else {
                showSuccess(i);
            }
        })
    }

    // get correct format field name

    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // check length of the input element

    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} should be atleast ${min} characters`);
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} should be max ${max} characters`);
        }
    }

    // check validation email

    function validateEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email is not valid');
        }
    }

    // check matching password

    function matchPassword(password, password2) {
        if (password.value.trim() !== password2.value.trim()) {
            showError(password2, 'Password is not same')
        }
    }

    // event listener
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        checkRequired([username, email, password, password2]);
        checkLength(username, 3, 12);
        checkLength(password, 6, 25);
        validateEmail(email);
        matchPassword(password, password2);
    });
}