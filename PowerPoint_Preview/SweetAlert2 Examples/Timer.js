// Working on this one

let timerInterval
Swal.fire({
  title: 'Generating PowerPoint Preview',
  timer: 20000,
  timerProgressBar: false,
  didOpen: () => {
    Swal.showLoading();
    return fetch(`//api.github.com/users/panda`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .catch(error => {
      Swal.showValidationMessage(
        `Request failed: ${error}`
      )
    })
  },
  willClose: () => {
    clearInterval(timerInterval)
  },
  allowOutsideClick: () => !Swal.isLoading()
})