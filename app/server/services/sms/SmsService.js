import countryPhone from "../../../../app/server/services/sms/country_phone.json";

/****************************************************
 * SMS HANDLER SECTION
 * SmsHandler implementation filenames
 * should be the SMS_IMPL (ie. Twillio) + SmsHandler
 * eg. TwillioSmsHandler
 ****************************************************/

const smsHandlerImpl = (process.env.SMS_IMPL || 'Twilio');

/**
 * The SmsHandler implementations
 * should have the functions:
 * receiveSms(req)
 */
export const SmsHandler = require('./' + smsHandlerImpl + 'SmsHandler');


/***********************
 * SMS SENDER SECTION
 ***********************/

/* define all the sender implementations by country code */
const smsSenderImpls = {
    AU: require('./TelstraSmsSender')
};

export class SmsSender {

    constructor() {
        this.senderImpl = null;
        this.setSenderImpl = this.setSenderImpl.bind(this);
        this.sendSms = this.sendSms.bind(this);
    }

    /**
     * Sets the sms sender to the appropriate
     * sender impl for the country code
     * @param country_code
     */
    setSenderImpl(country_code) {
        if (smsSenderImpls.hasOwnProperty(country_code)) {
            this.senderImpl = smsSenderImpls[country_code];
        }
    }

    /**
     * The country code will help with checking
     * which sms sender service to use
     * ie. AU will use Telstra's service
     * @param country_code
     * @param number (doesn't include country call code)
     * @param message
     */
    sendSms(country_code, number, message) {
        this.setSenderImpl(country_code);
        number = getCallCode(country_code) + number;
        if(this.senderImpl) {
            this.senderImpl(number, message);
        }
    }

}



/*******************
 * HELPER FUNCTIONS
 *******************/
export const getCallCode = (country_code) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const startAlphabetIndex = alphabet.indexOf(country_code.charAt(0));
    /* start searching from the starting country index */
    let countryIndex = Math.floor((startAlphabetIndex * countryPhone.length)/alphabet.length);
    while(countryPhone[countryIndex].country_code != country_code) {
        // country code at index is higher alphabetically
        if(countryPhone[countryIndex].country_code > country_code) {
            countryIndex--;
        } else countryIndex++;
    }

    return countryPhone[countryIndex].call_code;
};

export default {
    SmsHandler: SmsHandler,
    SmsSender: SmsSender
};