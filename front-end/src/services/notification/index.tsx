import toast from 'react-hot-toast';


const successNotification = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-center'
  })
}

const errorNotification = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-center'
  })
}

const loadingNotification = (message: string) => {
  toast.loading(message, {
    duration: 4000,
    position: 'top-center'
  })
}

const clearNotification = () =>  toast.dismiss();

export default {
  successNotification,
  errorNotification,
  loadingNotification,
  clearNotification
}