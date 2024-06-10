import { Component } from 'react';
import axios from 'axios'; 

class SingupForm extends Component {
    state = {
        userName: '', 
        email: '',
        password: '',
        errors: {},
    };

    handlerUserName = (event) => {
        this.setState({ userName: event.target.value }); 
    };

    handlerEmail = (event) => {
        this.setState({ email: event.target.value });
    };

    handlerPassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handlerSubmit = async (event) => {
        event.preventDefault();
        const { userName, email, password } = this.state;

        const errors = {};
        if (!userName.trim()) {
            errors.userName = "Username is required";
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        try {
           
            const response = await axios.post('/api/signup', {
                userName,
                email,
                password
            });

            
            console.log('User registered successfully:', response.data);
        } catch (error) {
            
            console.error('Registration failed:', error.response.data);
           
            this.setState({ errors: error.response.data.errors });
        }

       
        this.setState({ userName: '', email: '', password: '', errors: {} });
    };

    render() {
        const { userName, email, password, errors } = this.state; 
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <h2 className='mt-5'>Signup</h2>
                        <form onSubmit={this.handlerSubmit}>
                            <div className='form-group mt-3'>
                                <label>Username:</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={this.handlerUserName}
                                    className='form-control'
                                    required
                                />
                                {errors.userName && <span style={{ color: 'red' }}>{errors.userName}</span>}
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={this.handlerEmail}
                                    className='form-control'
                                    required
                                />
                                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                            </div>
                            <div className='form-group mt-3'>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={this.handlerPassword}
                                    className='form-control'
                                    required
                                />
                                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                            </div>
                            <button type="submit" className='btn btn-primary mt-3'>Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingupForm;
