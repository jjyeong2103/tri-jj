import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('warning-button');
  button.addEventListener('click', () => {
    Swal.fire({
      title: '🚫 Warning!',
      text: 'I Said Do Not Click This Button',
      icon: 'warning',
      confirmButtonText: 'I Understand',
      background: '#1b263b',
      color: '#e0e1dd',
      confirmButtonColor: '#778da9'
    });
  });
});
