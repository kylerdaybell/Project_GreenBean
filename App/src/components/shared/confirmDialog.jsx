import * as React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ConfirmBox = props => {

        confirmAlert({
        title: props.title,
        message: props.message,
        buttons: [
            {
            label: 'Yes',
            onClick: () => { return true;}
            },
            {
            label: 'No',
            onClick:()=> { return false;}
            }
        ]
        })
}
export default ConfirmBox;