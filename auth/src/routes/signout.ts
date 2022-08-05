import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    // Set the session to null to remove everything from the cookie session and sign the user out.
    req.session = null;
    
    // Return an empty object to confirm the session is null.
    res.send({});
});

export { router as signoutRouter };