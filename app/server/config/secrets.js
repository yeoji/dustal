const secrets = {
    jwtSecret: process.env.JWT_SECRET || 'H3lloD0lly',
    telstraKey: 'FP1zoA6rM0HDgUrR8NcB64MZDKLI1c5X',
    telstraSecret: 'JNDOTg62v3WxAgEd',
    twilioHandlerKey: process.env.TWILIO_HANDLER_KEY || 'UMOAU3UiDH9if3y4sy6s',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || 'hellodolly'
};

export default secrets;