import React from 'react';
import LoginContainer from '../Login/LoginContainer';

const Home = props => {
    const { user } = props;
    let form = '';

    if (!user) {
      form = <LoginContainer />
    }

    return (
      <div>
        {form}
      </div>
    );
}


export default Home;
