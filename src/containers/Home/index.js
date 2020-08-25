import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import Verification from '../../components/Verification';

function Home() {
  return (
    <div className="home d-flex align-items-center">
      <div className="center-layout verification">
        <Verification />
      </div>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Home);
