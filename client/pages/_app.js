import 'bootstrap/dist/css/bootstrap.css';

const _App = ({ Component, pageProps }) => {
    // Return Compoent and spread over pageProps
    return <Component {...pageProps} />
    
};

export default _App;