const prod = {
    UNIT_CONVERSION_ENDPOINT: 'https://macpunitconversionsmicroservice.azurewebsites.net/'
};

const dev = {
    UNIT_CONVERSION_ENDPOINT: 'http://localhost:60937/'
};

export const Settings = process.env.NODE_ENV === 'production' ? prod : dev;