import Swal from 'sweetalert2'

const Swalfire = () => {
  return Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#506bcc',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      //   dispatch(deleteUser(id)).then(async (result) => {
      //       if (result.meta.requestStatus === 'fulfilled') {
      //           dispatch(
      //               getAllClient({
      //                   page: page || 1,
      //                   pageSize: pageSize,
      //               }),
      //           )
      //       }
      //   })
    }
  })
}

export default Swalfire
