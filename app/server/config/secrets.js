const secrets = {
    jwtSecret: process.env.JWT_SECRET || 'H3lloD0lly',
    telstraKey: process.env.TELSTRA_KEY,
    telstraSecret: process.env.TELSTRA_SECRET
};

export default secrets;