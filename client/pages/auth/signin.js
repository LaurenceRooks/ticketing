import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignIn = () => {
    // Create states for both email and password to keep track of what is entered.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Call the useRequest function to perform the request and display any errors found.
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email,
            password
        },
        // Navigate the user back to the root landing page.
        onSuccess: () => Router.push('/')
    });

    // Define the onSubmit helper function.
    const onSubmit = async (event) => {
        event.preventDefault();

        // Call the doRequest hook.
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group" style={{marginBottom: 20}}>
                <label>Emaiil Address</label>
                <input
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group" style={{marginBottom: 20}}>
                <label>Password</label>
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>

            {/* Dispay any errors found. */}
            {errors}
            <button className="btn btn-primary">Sign In</button>
        </form>
    );
};

export default SignIn;