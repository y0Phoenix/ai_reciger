/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { Button, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { grow } from '../types/Motion';

interface InnerHTMLProps {
    text: string,
    iconClass?: string,
    loading: boolean
}

const InnerHTML: React.FC<InnerHTMLProps> = ({text, iconClass, loading}) => (
    <div>
        {loading ? 
            (
                <Spinner size='sm' animation='border'></Spinner>
            ) : 
            (
                <>
                    {!iconClass ? 
                        (
                            <>
                                {text}
                            </>
                        ) 
                        : 
                        (
                            <>
                                {text}<i className={iconClass}></i>
                            </>
                        )
                    }
                </>
            )
        }
    </div>
)

const mapStateToProps = (state: State) => ({
    loading: state.loading
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    changes?: boolean,
    callback?: () => void,
    isMotion?: boolean,
    text: string,
    iconClass?: string,
    type: 'button' | 'reset' | 'submit',
    className?: string,
    variant?: string
}

const LoadingButton: React.FC<Props> = ({ loading, changes, callback, className, variant, isMotion, text, iconClass, type }) => {
    changes = changes !== undefined ? changes : true; 
    const isDisabled = (!changes || loading);
    return (
        <>
            {isMotion ? 
                (
                    <motion.button type={type} whileHover={grow} className={className} disabled={isDisabled} onClick={() => callback && callback()}>
                        <InnerHTML text={text} iconClass={iconClass} loading={loading}/>
                    </motion.button>
                )
                : 
                (
                    <Button type={type} className={className} variant={variant} disabled={isDisabled} onClick={() => callback && callback()}>
                        <InnerHTML text={text} iconClass={iconClass} loading={loading}/>
                    </Button>
                )
            }
        </>
    )
}

export default connector(LoadingButton);