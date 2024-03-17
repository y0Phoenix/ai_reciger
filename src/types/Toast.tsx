/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { SET_TOAST, REMOVE_TOAST, SET_TOAST_WITH_ID } from "../actions/types"
import {v4 as uuid} from 'uuid';
import { ThunkDispatch } from "redux-thunk";
import State from "./State";
import { setToastWithId } from "../actions/toast";
import { Button } from "react-bootstrap";

export type ToastState = Toast[];

interface ToastProps {
    body: string, 
    autoHide: boolean,
    bg?: 'success' | 'danger' | 'info' | 'warning' | 'none',
    buttonCallback?: () => void,
    buttonText?: string,
    /**
     * @description if creating the toast inside of a dispatched action function 
     */
    dispatcher?: ThunkDispatch<State, undefined, any>,
    /**
     * @description if creating the toast outside of a dispathed action function like in a component
     */
    setToastWithId?: (toast: Toast) => void
}

export class Toast {
    time: number = 0 
    timeFrom: string = ''
    body: string = ''
    id: string = ''
    bg: 'success' | 'danger' | 'info' | 'warning' | 'none' = 'none'
    autoHide: boolean = false
    interval: number = 0;
    buttonCallback: () => void = () => {};
    jsxBody?: JSX.Element;

    constructor ({
        body,
        autoHide,
        bg,
        buttonCallback,
        buttonText,
        dispatcher
    }: ToastProps) {
        this.time = Date.now();
        const timeFrom = moment(this.time);
        this.timeFrom = timeFrom.from(this.time);
        this.body = body;
        if (bg) this.bg = bg;
        this.autoHide = autoHide;
        this.id = uuid();
        if (dispatcher || setToastWithId) {
            this.interval = setInterval(() => {
                this.timeFrom = timeFrom.from(Date.now());
                if (dispatcher) dispatcher(setToastWithId(this));
                else setToastWithId(this);
            }, 60000);
        }
        if (buttonCallback) {
            this.buttonCallback = buttonCallback;
            this.jsxBody = (
                <>
                    <div className="Flex gap-xsm">
                        <h5>{this.body}</h5>
                        <Button variant={this.bg} onClick={() => this.buttonCallback()}>{buttonText && buttonText}</Button>
                    </div>
                </>
            );
        }
        else this.jsxBody = (
            <>{this.body}</>
        )
    }

    closeToast(dispatcher: (id: string) => void) {
        clearInterval(this.interval);
        dispatcher(this.id);
    }
}

export interface SetToastAction {
    type: typeof SET_TOAST
    payload: Toast
}

export interface SetToastWithIdAction {
    type: typeof SET_TOAST_WITH_ID
    payload: Toast
}

export interface RemoveToastAction {
    type: typeof REMOVE_TOAST,
    payload: string
}

export type ToastAction = SetToastAction | RemoveToastAction | SetToastWithIdAction;