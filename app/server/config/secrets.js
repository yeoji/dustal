const secrets = {
    jwtSecret: process.env.JWT_SECRET || 'H3lloD0lly',
    telstraKey: process.env.TELSTRA_KEY,
    telstraSecret: process.env.TELSTRA_SECRET,
    twilioHandlerKey: process.env.TWILIO_HANDLER_KEY || 'UMOAU3UiDH9if3y4sy6s',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || 'hellodolly'
};

export default secrets;