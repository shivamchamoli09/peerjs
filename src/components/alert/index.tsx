import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setAlert } from "../../core/stores/actions/actions";
import store from "../../core/stores/root/store";
import { IAlert } from "../../core/types/store.types";



export default function AlertComponent(props: any) {
    const dispatch = useDispatch();
    store?.subscribe(() => {
        if (toast.isActive('msg')) { 
            toast.dismiss('msg');
        }
        const alert = store?.getState()?.alertStore?.alert;
        switch (alert.type) {
            case 'success':
                toast.success(alert.message, {
                    toastId: 'msg',
                });
                break;
            case 'error':
                toast.error(alert.message, {
                    toastId: 'msg',
                });
                break;
            case 'warning':
                toast.warning(alert.message, {
                    toastId: 'msg',
                });
                break;
            case 'info':
                toast.info(alert.message, {
                    toastId: 'msg',
                });
                break;
            default:
                break;
        }
        if (alert?.message?.length) {
            dispatch({
                type: setAlert.toString(),
                payload: { type: '', message: '' }
            })
        }
    })

    return <ToastContainer
        containerId={'toastContainer'}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
}