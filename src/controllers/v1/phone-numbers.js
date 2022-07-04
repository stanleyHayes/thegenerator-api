const fs = require("fs");
const countryTelData = require("country-telephone-data");
const {phone} = require("phone");
const path = require("path");
const {generate} = require("./../../utils/utils");
const {Metadata} = require("libphonenumber-js");
const metadata = new Metadata();

exports.generatePhoneNumbers = async (req, res) => {
    try {
        const {countryCode, digits} = req.body;
        const country = countryTelData.allCountries.find(country => country['iso2'] === countryCode.toLowerCase());
        if (!country)
            return res.status(404).json({message: 'Country not found'});
        const countryPhoneCode = country.dialCode;

        metadata.selectNumberingPlan(countryCode);
        const possibleLengths = metadata.possibleLengths();
        let numbers = ''

        for(let i = 0; i < possibleLengths.length; i++){
            let possibleLength = possibleLengths[i];

            const zeros = generate('0', possibleLength - (countryPhoneCode.length + 4));
            const nines = generate('9', possibleLength - (countryPhoneCode.length + 4));

            const startNumber = parseInt(`${countryPhoneCode}${digits}${zeros}`);
            const endNumber = parseInt(`${countryPhoneCode}${digits}${nines}`);

            for (let start = startNumber; start <= endNumber; start++) {
                if(phone(start.toString(), {country: countryCode}).isValid){
                    numbers = numbers.concat(`${start}\n`);
                }
            }
        }

        fs.writeFile(`${__dirname}\\${country.name}.txt`, numbers, 'utf8', error => {
            if (error) throw error
            res.status(201).download(path.join(__dirname, `${country.name}.txt`));
        });

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}