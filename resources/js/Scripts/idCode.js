
function getChecksum(idCode) {
    const weightsI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const weightsII = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

    let sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += idCode[i] * weightsI[i];
    }

    let remainder = sum % 11;

    if (remainder < 10) {
        return remainder;
    } else {
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += idCode[i] * weightsII[i];
        }
        remainder = sum % 11;
        if (remainder < 10) {
            return remainder;
        } else {
            return 0;
        }
    }
}

function isValidIdCode(idCode) {
    if (typeof idCode === 'number') {
        idCode = idCode.toString();
    }
    if (idCode.length !== 11) {
        return false;
    }
    const checksum = getChecksum(idCode);
    return checksum === parseInt(idCode[10]);
}


const centuryMap = {
    '1': 1800,
    '2': 1800,
    '3': 1900,
    '4': 1900,
    '5': 2000,
    '6': 2000,
    '7': 2100,
    '8': 2100,
};

const genderMap = (number) => {
    number = parseInt(number);
    if (number % 2 === 0) {
        return 'Woman'
    } else {
        return 'Man'
    }
}
const hospitalMap = {
    '001': 'Kuressaare haigla',
    '011': 'Tartu Ülikooli Naistekliinik',
    '021': 'Ida-Tallinna keskhaigla / Pelgulinna sünnitusmaja (Tallinn)',
    '151': 'Keila haigla',
    '161': 'Rapla haigla / Loksa haigla / Hiiumaa haigla (Kärdla)',
    '221': 'Ida-Viru keskhaigla (Kohtla-Järve, endine Jõhvi)',
    '271': 'Maarjamõisa kliinikum (Tartu) / Jõgeva haigla',
    '371': 'Narva haigla',
    '421': 'Pärnu haigla',
    '471': 'Haapsalu haigla',
    '491': 'Järvamaa haigla (Paide)',
    '521': 'Rakvere haigla / Tapa haigla',
    '571': 'Valga haigla',
    '601': 'Viljandi haigla',
    '651': 'Lõuna-Eesti haigla (Võru) / Põlva haigla',
};

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function isValidEstonianID(id) {
    // Check if ID has 11 digits
    if (!/^\d{11}$/.test(id)) {
        return false;
    }


    const year = centuryMap[id[0]] + parseInt(id.substring(1, 3));
    const month = parseInt(id.substring(3, 5));
    const day = parseInt(id.substring(5, 7));

    // Check month validity
    if (month < 1 || month > 12) {
        return false;
    }

    // Check leap year for February
    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
        daysInMonth[1] = 29;
    }

    // Check day validity
    if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }

    const hospitalCode = id.substring(7, 10);
    let hospital = 'invalid';

    const codes = Object.keys(hospitalMap).sort();

    for (let i = 0; i < codes.length - 1; i++) {
        if (hospitalCode >= codes[i] && hospitalCode < codes[i + 1]) {
            hospital = hospitalMap[codes[i]];
            break;
        }
    }

// Handling the case if the code is higher than the last code in our map
    if (hospitalCode >= codes[codes.length - 1]) {
        hospital = hospitalMap[codes[codes.length - 1]];
    }



    if (!hospital) {
        return "Invalid hospital code";
    }

    if (!isValidIdCode(id)) {
        return "Invalid checksum";
    }

    const gender = genderMap(id[0]);

    return `${gender} born in ${year}, birthplace: ${hospital}`;
}

export {isValidEstonianID};
