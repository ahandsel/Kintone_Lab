const ipAPI = '//api.ipify.org?format=json'

Swal.queue([{
  title: 'Generating P',
  confirmButtonText: 'Show my public IP',
  text:
    'Your public IP will be received ' +
    'via AJAX request',
  showLoaderOnConfirm: true,
  preConfirm: () => {
    return fetch(ipAPI)
      .then(response => response.json())
      .then(data => Swal.insertQueueStep(data.ip))
      .catch(() => {
        Swal.insertQueueStep({
          icon: 'error',
          title: 'Unable to get your public IP'
        })
      })
  }
}])

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Signed in successfully'
})