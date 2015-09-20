/**
 * SmsHandler implementation filenames
 * should be the SMS_IMPL (ie. Twillio) + SmsHandler
 * eg. TwillioSmsHandler
 */
const smsImpl = (process.env.SMS_IMPL || 'Twilio');
const SmsService = require('./' + smsImpl + 'SmsHandler');

/**
 * The SmsHandler implementations
 * should have the functions:
 * receiveSms(req)
 */
export default SmsService;