import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.scss';
import styled from 'styled-components';
import { history } from '../../store';

const Button = styled.button`
  min-width: 150px;
  margin-left: 10px;
`;

function Report({ searchResult, downloadUrl }) {
  const onDownload = async () => {
    const url = `${process.env.REACT_APP_PUBLIC_URI}${downloadUrl}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf');
    document.body.appendChild(link);
    link.click();
  };

  if (!searchResult) {
    history.push('/');
    return <></>;
  }

  const week = moment.weekdays(moment(searchResult.createdAt).weekday());
  const month = moment.months(moment(searchResult.createdAt).month());
  const pm = moment(searchResult.createdAt).hours() > 12 ? 'PM' : 'AM';

  const nurseLicense = searchResult.nurseLicenses[0];
  const name = nurseLicense ? `${nurseLicense.firstName} ${nurseLicense.lastName}` : '';

  return (
    <div className="report d-flex flex-column">
      <div className="header">
        <h1>Quick Confirm License Verification Search  Results</h1>
      </div>
      <div className="action-buttons">
        <Link to="/">
          <Icon.Plus size={14} />
          New search
        </Link>
      </div>
      <div className="content d-flex justify-content-between flex-grow-1">
        <div>
          <p>Primary Source Boards of Nursing Report Summary for</p>
          <h2 className="title">{`${name} [NCSBN ID: ${searchResult.ncsbnId}]`}</h2>
          <p>{`Report Date: ${week}, ${month} ${moment(searchResult.createdAt).format('DD YYYY hh:mm:ss')} ${pm}`}</p>
        </div>
        <div>
          <Button className="btn btn-secondary d-flex align-items-center" onClick={onDownload}>
            <Icon.ArrowDown />
            Download report
          </Button>
        </div>
      </div>
    </div>
  );
}

Report.propTypes = {
  searchResult: PropTypes.object.isRequired,
  downloadUrl: PropTypes.string.isRequired,
};

Report.defaultProps = {};

const mapStateToProps = ({ license }) => ({
  searchResult: license.searchResult,
  downloadUrl: license.downloadUrl,
});

export default connect(mapStateToProps)(Report);
