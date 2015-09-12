const secrets = {
    sessionSecret: process.env.SESSION_SECRET || 'H3lloD0lly',
    jwtSecret: process.env.JWT_SECRET || 'H3lloD0lly'
};

export default secrets;