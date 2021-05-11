import React from 'react';
import { Link } from 'react-router-dom';
// import '../Style/ErrorScreen.css';
import errorImage from '../../resources/images/error.png';
import { Typography } from '@material-ui/core';

export default function ErrorScreen() {
  return (
    <React.Fragment>
      <div className="container">
        <img src={errorImage} alt="error" className="error" />
        <div className="text-container">
          <div>
            <Typography>
              Unexpected error occurred
            </Typography>
          </div>
          <div>
            <Typography>
              ERROR
            </Typography>
          </div>
          <Typography>
            Please contact your administrator
          </Typography>
          <p></p>
          <div>
            <Typography>
              or
              &nbsp;
              <Link to="/">
                back to home page
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}