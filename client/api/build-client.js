import axios from 'axios';

const buildClient = ({ req }) => {
    // Check to see if we are executing within the client or on the server.
    if (typeof window === 'undefined') {
        // Undefined means we are executing on the server.
        // Requests should be made with the fully qualified kubernetes service namespace URL as the base URL.
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // Defined means we are executing on the client.
        // Requests should be made with '' as the base URL.
        return axios.create({
            baseURL: '/'
        });
    }
};

export default buildClient;