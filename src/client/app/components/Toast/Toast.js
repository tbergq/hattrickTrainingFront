import React from 'react';
import {observer} from'mobx-react';
import {
  action,
  observable
} from 'mobx';
import styles from './toast.scss';
import {ToastStore} from '../../stores';


@observer
class Toast extends React.Component {



  render() {
    let toastClass;
    if (ToastStore.toastMessage) {
      toastClass = `${styles.toast} animated fadeInUp`;
      setTimeout(() => {
        ToastStore.clearToastMessage();
      }, 3000);
    }
    else {
      toastClass = styles.hiddenToast;
    }
    return (
      <div className={toastClass}>
        {ToastStore.toastMessage}
      </div>
    )
  }
}

export default Toast;