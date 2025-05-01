document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const loading = form.querySelector('.loading');
      const errorMsg = form.querySelector('.error-message');
      const successMsg = form.querySelector('.msgSuccess');

      loading.classList.add('d-block');
      errorMsg.classList.remove('d-block');
      successMsg.classList.remove('d-none', 'invisible');
      successMsg.classList.add('d-block');
      setTimeout(() => {
        successMsg.classList.remove('d-block');
        successMsg.classList.add('d-none');
      }, 2500);
      

      const formData = new FormData(form);

      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      })
      .then(response => response.json())
      .then(data => {
        loading.classList.remove('d-block');
        if (data.success) {
          successMsg.classList.add('d-block');
          form.reset();
        } else {
          displayError(errorMsg, data.message || 'Something went wrong.');
        }
      })
      .catch(error => {
        loading.classList.remove('d-block');
        displayError(errorMsg, error.message);
      });
    });
  });

  function displayError(element, message) {
    element.innerHTML = message;
    element.classList.add('d-block');
  }
});