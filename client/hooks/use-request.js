import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            // Reset the error state to null before making the request.
            setErrors(null);

            // Send the email and password to the signup api in the auth service using axios.
            const response = await axios[method](url, body);

            // Check if onSuccess is provided.
            if (onSuccess) {
                onSuccess(response.data);
            }
    
            return response.data;
        } catch (error) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops....</h4>
                    <ul className="my-0">
                        {
                            error.response.data.errors.map(error =>
                                <li key={error.message}>{error.message}</li>
                            )
                        }
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};

export default useRequest;