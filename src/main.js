document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('warning-button');
  button.addEventListener('click', () => {
    alert('I Said Do Not Click This Button');
  });
});

