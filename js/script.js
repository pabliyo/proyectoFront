function validarForm() {
    const name = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const birthday = document.getElementById('birthday').value;
    const question = document.getElementById('question').value;
  
    if (name === '' || email === '' || birthday === '' || question === '') {
      console.error('Por favor, complete todos los campos del formulario.');
      return false; 
    } else {
      console.log('Formulario enviado correctamente.');
      return true;
    }
}