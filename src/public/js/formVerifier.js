document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault()
    const formElements = this.elements;
    let valid = true;

    for (let element of formElements) {
        if (element.hasAttribute('required') && !element.value) {
            valid = false;
            alert(`Por favor completa el campo: ${element.placeholder}`);
            element.focus();
            break;
        }
    }

    if (!valid) {
        event.preventDefault();
    }
});