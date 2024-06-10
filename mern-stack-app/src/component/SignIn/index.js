
import './index'




import React, { Component } from 'react';

class Signin extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  handlerEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlerPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handlerSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }


    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

  
   
    console.log('User signed in with:', { email, password });

    
    this.setState({ email: '', password: '', errors: {} });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mt-5">Signin</h2>
            <form onSubmit={this.handlerSubmit}>
              <div className="form-group mt-3">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={this.handlerEmail}
                  required
                />
                {errors.email && <span className="text-danger">{errors.email}</span>}
              </div>
              <div className="form-group mt-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={this.handlerPassword}
                  required
                />
                {errors.password && <span className="text-danger">{errors.password}</span>}
              </div>
              <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// export default Signinform;




// const Signin = () => {
//     return (
//       <div>
//         <h2>Signin</h2>
//         <p>Please sign in to access the page.</p>
//       </div>
//     );
//   };
  
  export default Signin;