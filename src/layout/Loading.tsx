/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Spinner } from 'react-bootstrap';
import State from '../types/State';
import { ConnectedProps, connect } from 'react-redux';

const mapStateToProps = (state: State) => ({
    loading: state.loading
});

const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector>;

const LoadingOverlay: React.FC<Props> = ({loading}) => {
  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
        width: '100%',
        height: '100%',
        zIndex: 9999, // Ensure it appears above other content
      }}
    >
      <Spinner animation="border" role="status" style={{ width: '5rem', height: '5rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default connector(LoadingOverlay);
