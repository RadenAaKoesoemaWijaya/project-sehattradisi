import toast from 'react-hot-toast';

export const useToast = () => {
  const showSuccess = (message: string, duration?: number) => {
    return toast.success(message, {
      duration: duration || 4000,
      position: 'top-right',
    });
  };

  const showError = (message: string, duration?: number) => {
    return toast.error(message, {
      duration: duration || 4000,
      position: 'top-right',
    });
  };

  const showWarning = (message: string, duration?: number) => {
    return toast(message, {
      icon: '⚠️',
      duration: duration || 4000,
      position: 'top-right',
    });
  };

  const showInfo = (message: string, duration?: number) => {
    return toast(message, {
      icon: 'ℹ️',
      duration: duration || 4000,
      position: 'top-right',
    });
  };

  const ToastContainer = () => {
    return null; // react-hot-toast handles its own container
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    ToastContainer
  };
};
