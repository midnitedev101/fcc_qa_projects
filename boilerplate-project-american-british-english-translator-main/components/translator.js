const americanOnly = require('./american-only.js'); // total length 183
const americanToBritishSpelling = require('./american-to-british-spelling.js'); // total length 1699
const americanToBritishTitles = require("./american-to-british-titles.js");  // total length 6
const britishOnly = require('./british-only.js');    // total length 243

class Translator {

    dictionaryLookup(locale, text) {
        // let textArray = text.split(" ");
        let originalText = text;
        if (locale == 'american-to-british') {
            // console.log(text);
            text = this.americanLookup(text, locale);
            text = this.americanSpelling(text, locale);
            text = this.titleLookup(text, locale);
            text = this.timeLookup(text, locale);
            // console.log(text)
        } else if (locale == 'british-to-american') {
            text = this.britishLookup(text, locale);
            text = this.americanSpelling(text, locale);
            text = this.titleLookup(text, locale);
            text = this.timeLookup(text, locale);
        }
        let newText = text.split("");
        const updateFirstChar = newText[0].toUpperCase();
        const updateFirstWord = newText[0].slice(1);
        // console.log(updateFirstChar);
        // console.log(updateFirstWord);
        const combineUpdate = updateFirstChar + updateFirstWord;
        // console.log(combineUpdate);
        newText.shift();
        newText.unshift(combineUpdate);
        // console.log(newText);
        console.log(newText.join(""));
        // console.log(newText.join(""), originalText);
        if (newText.join("") == originalText) {
            return "Everything looks good to me!";
        }
        return newText.join("");
    }

    americanLookup(element, locale) {
        let newElement = element;
        for (const [key, value] of Object.entries(americanOnly)) {
            let regexp = new RegExp("\\b" + key + "\\b").test(newElement.toLowerCase());
            if (regexp) {    // find definition of americanOnly key inside text string "element"
                let keyCaseInsensitive = new RegExp(key, "gi");
                newElement = (newElement).replace(keyCaseInsensitive, `<span class="highlight">${value}</span>`);  // replace occurence of key with value
                // return newElement;
            }
        }
        // return element;
        return newElement;
    }

    americanSpelling(element, locale) {
        let newElement = element;
        const spellingObj = {};
        const swappedSpelling = {};
        if (locale == 'british-to-american') {
            for (const key in americanToBritishSpelling) {
                swappedSpelling[americanToBritishSpelling[key]] = key;
            }
            Object.assign(spellingObj, swappedSpelling);
        } else {
            Object.assign(spellingObj, americanToBritishSpelling);
        }
        // console.log(Object.keys(spellingObj).length);
        // console.log(newElement);
        for (const [key, value] of Object.entries(spellingObj)) {
            let regexp = new RegExp("\\b" + key + "\\b").test(newElement.toLowerCase());
            if (regexp) {    // find definition of americanSpelling key inside text string "element"
                // console.log('yo', newElement, element);
                let keyCaseInsensitive = new RegExp(key, "gi");
                // console.log(keyCaseInsensitive.test(newElement.toLowerCase()))
                // console.log(newElement, key);
                newElement = (newElement).replace(keyCaseInsensitive, `<span class="highlight">${value}</span>`);  // replace occurence of key with value
                // console.log(newElement, key);
                // return newElement;
            }
        }
        // return element;
        return newElement;
    }

    titleLookup(element, locale) {
        let newElement = element;
        const titleObj = {};
        const swappedTitles = {};
        if (locale == 'british-to-american') {
            for (const key in americanToBritishTitles) {
                swappedTitles[americanToBritishTitles[key]] = key;
            }
            Object.assign(titleObj, swappedTitles);
        } else {
            Object.assign(titleObj, americanToBritishTitles);
        }
        // console.log(locale, titleObj);
        for (const [key, value] of Object.entries(titleObj)) {
            // console.log("yo",regexp, key)
            // console.log(new RegExp("^\\b" + key + "\\b$"))
            // let regexp;
            // if (locale == 'american-to-british') {
            //     console.log("atob: ", key, element);
            //     // regexp = new RegExp("\\b" + key + "\\b").test(element.toLowerCase());
            //     regexp = "/\b(Mr|Mrs|Mr|Dr|Er)\.\b/gi".test(element.toLowerCase());
            //     console.log(regexp);
            // } else {
            //     console.log("btoa: ", key, element);
            //     regexp = new RegExp("\\b" + key + "\\b").test(element.toLowerCase());
            // }
            
            // let regexp = new RegExp("\\b" + key + "\\b").test(newElement.toLowerCase());
            let regexp;
            if (locale == 'american-to-british') {
                // console.log(key, key.slice(0,key.length-1));    // mrs. mrs
                let updatedKey = key.slice(0,key.length-1); // remove dot on end of key string to match with element string
                regexp = new RegExp("\\b" + updatedKey + "\\b", "gi").test(newElement.toLowerCase());
            } else {
                regexp = new RegExp("\\b" + key + "\\b", "gi").test(newElement.toLowerCase());
            }
            
            
            // let regexp = newElement.toLowerCase().includes(key);
            if (regexp) {    
                // console.log(locale, regexp, key);
                let newValue = value.split("");
                const updateFirstTitleChar = newValue[0].toUpperCase();
                const updateFirstTitleWord = newValue[0].slice(1);
                const combineUpdate = updateFirstTitleChar + updateFirstTitleWord;
                newValue.shift();
                newValue.unshift(combineUpdate);
                newValue = newValue.join("");
                // console.log("new Value: ", newValue);
                // console.log("original key: ", key, "\noriginal string: ", newElement)
                // console.log("to replace with: ", titleObj[key]);
                let keyCaseInsensitive = new RegExp(key, "gi");
                // console.log(newValue.toLowerCase(), titleObj[key]);
                if (locale == 'american-to-british') {
                    // console.log(newElement, new RegExp("\\b"+newValue+"[\s]", "gi"))
                    if (!newElement.match(new RegExp(newValue+" ", "gi"))) {
                        newElement = (newElement).replace(keyCaseInsensitive, `<span class="highlight">${newValue}</span>`);  // replace occurence of key with value
                    }
                } else {
                    if (!newElement.match(new RegExp(newValue+"[\.] ", "gi"))) {
                        newElement = (newElement).replace(keyCaseInsensitive, `<span class="highlight">${newValue}</span>`);  // replace occurence of key with value
                    }
                }
                // newElement = (newElement).replace(keyCaseInsensitive, `<span class="highlight">${newValue}</span>`);  // replace occurence of key with value
                // console.log(newElement);
                // return newElement;
            }
        }
        // return element;
        return newElement;
    }

    britishLookup(element, locale) {
        let newElement = element;
        for (const [key, value] of Object.entries(britishOnly)) {
            let regexp = new RegExp("\\b" + key + "\\b").test(newElement.toLowerCase());

            if (regexp) {    // find definition of britishLookup key inside text string "element"
                let keyCaseInsensitive = new RegExp(key, "gi");
                newElement = (newElement).replace(keyCaseInsensitive, `<span class="highlight">${value}</span>`);  // replace occurence of key with value
            }
        }
        return newElement;
    }

    timeLookup(element, locale) {
        let newElement = element;
        let regex = /(0?[1-9]|1[0-2])(:|.)[0-5][0-9]/gi;
        if (regex.test(newElement)) {
            if (locale == 'british-to-american') {
                let newTime = newElement.match(regex).toString();
                let newTimeUpdate = (newTime).replace(/\./, `:`);  // replace occurence of key with value
                if (newTimeUpdate != newTime) {
                    newElement = (newElement).replace(regex, `<span class="highlight">${newTimeUpdate}</span>`);  // replace occurence of key with value
                }
            } else {
                let newTime = newElement.match(regex).toString();
                let newTimeUpdate = (newTime).replace(/\:/, `.`);  // replace occurence of key with value
                if (newTimeUpdate != newTime) {
                    newElement = (newElement).replace(regex, `<span class="highlight">${newTimeUpdate}</span>`);  // replace occurence of key with value
                }
            }
        }
        return newElement;
    }
}

module.exports = Translator;