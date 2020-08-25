import React, { useEffect, useState } from 'react';
import {
  TextField,
  CircularProgress,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from '../common/Select';
import * as LicenseActions from '../../store/actions/license.action';
import { history } from '../../store';
import './style.scss';

const Button = styled.button`
  min-width: 220px;
  margin-left: 10px;
`;

const Verification = (props) => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      await props.fetchLicenseTypes();
      await props.fetchStates();
    })();
  }, []);

  useEffect(() => {
    if (licenseNumber && licenseType && state) setError('');
  }, [licenseNumber, licenseType, state]);

  const handleClick = async () => {
    try {
      if (!licenseNumber || !licenseType || !state) {
        setError('Please input all fields.');
        return;
      }
      const data = await props.searchByLicenseNumber({ licenseNumber, licenseType, state });
      if (data.length === 0) alert('There is no search results');
      else history.push('/report');
    } catch (err) {
      console.error(err);
    }
  };

  const { searchLoading, searchError, licenseTypes, states } = props;

  return (
    <div className="card d-flex flex-column p-5">
      <div className="w-100">
        <h1 className="mt-1 mb-4">QuickConfirm License Verification</h1>
      </div>
      <div className="d-flex flex-column">
        <div className="row mb-4">
          <div className="col-md-4">
            <TextField
              label="License Number"
              name="licenseNumber"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              margin="normal"
            />
          </div>
          <div className="col-md-4">
            <Select
              id="license-type"
              name="licenseType"
              label="License Type"
              value={licenseType}
              onChange={(value) => setLicenseType(value)}
              options={licenseTypes}
            />
          </div>
          <div className="col-md-4">
            <Select
              id="state"
              name="state"
              label="State"
              value={state}
              onChange={(value) => setState(value)}
              options={states}
            />
          </div>
        </div>
        {
          error
          && (
            <div className="alert alert-danger">
              <button type="button" className="close" onClick={() => setError('')}>
                <span>x</span>
              </button>
              { error }
            </div>
          )
        }

        {
          searchError
          && (
            <div className="alert alert-danger">
              <button type="button" className="close" onClick={() => setError('')}>
                <span>x</span>
              </button>
              { searchError }
            </div>
          )
        }
        <div className="w-100 text-right">
          <Button className="btn btn-primary" onClick={handleClick} disabled={searchLoading}>
            { searchLoading ? <CircularProgress color="inherit" size={22} /> : 'Search By License Number' }
          </Button>
        </div>
      </div>
    </div>
  );
};

Verification.propTypes = {
  searchByLicenseNumber: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  fetchLicenseTypes: PropTypes.func.isRequired,
  licenseTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  states: PropTypes.array.isRequired,
  fetchStates: PropTypes.func.isRequired,
};

Verification.defaultProps = {
};

const mapStateToProps = ({ license }) => ({
  searchLoading: license.searchLoading,
  searchError: license.searchError,
  licenseTypes: license.licenseTypes,
  states: license.states,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    searchByLicenseNumber: LicenseActions.searchByLicenseNumber,
    fetchLicenseTypes: LicenseActions.fetchLicenseTypes,
    fetchStates: LicenseActions.fetchStates,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
