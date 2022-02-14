import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Forget from './Forget/Forget';

import styles from './Authentication.module.scss';

const Authentication = () => {
  return (
    <div className={styles.BoxWrapper}>
      <div className={styles.BoxWrapperLogo}>
        <Link to="/" className={styles.BoxWrapperLogoLink}>
          <b>CRM</b>
          SYSTEM
        </Link>
      </div>
      <div className={styles.BoxWrapperBlock}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forget" component={Forget} />
        </Switch>
      </div>
    </div>
  );
};

export default Authentication;
