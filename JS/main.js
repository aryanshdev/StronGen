function generatePassword() {
    var password = '';
    let len = parseInt(document.getElementById("pass-len-input").value);
    let useNums = document.getElementById("use-numbers").checked;
    let useSyms = document.getElementById('use-symbols').checked;
    if (useNums == false && useSyms == false) {
        password = onlyAlpha(len);
    } else if (useNums == true && useSyms == false) {
        password = onlyNums(len);
    } else if (useNums == false && useSyms == true) {
        password = onlySymbols(len);
    } else {
        password = everythingPassword(len);
    }
    var output = document.getElementById("pass-output-display");
    output.value = password;
    var button = document.getElementById('pass-download-btn');
    button.removeAttribute("disabled");
    updateUsageCount();
}

function displayUsageCount() {
    const countEl = document.getElementById('usageCount');
    fetch('https://api.countapi.xyz/get/strongen/passwords-created')
        .then(res => res.json())
        .then(res => {
            countEl.innerHTML = res.value + "+";
        });
}

function updateUsageCount() {
    fetch('https://api.countapi.xyz/hit/strongen/passwords-created')
        .then(res => res.json())
        .then(res => {
            displayUsageCount();
        });

}

function copyToClipboard() {
    let password = document.getElementById("pass-output-display");
    navigator.clipboard.writeText(password.value);
}

function showDownloadArea() {
    var downloadArea = document.getElementById("download-area");
    downloadArea.style.display = "block";
}

function downloadFile() {
    var tempLink = document.createElement("a");
    var password = document.getElementById("pass-output-display").value;
    var downloadInfo = document.getElementById('download-info-text');
    if (password == "") {
        return;
    }
    let site = document.getElementById('website-name').value;
    let username = document.getElementById('username').value;
    var blob = new Blob([site + ':-\n\t' + username + ' : ' + password], {
        type: "text/plain;charset=utf-8"
    });
    tempLink.setAttribute('href', URL.createObjectURL(blob));
    tempLink.setAttribute('download', 'Password ' + username + ' ' + site + '.txt');
    downloadInfo.style.visibility = "visible";
    tempLink.click();
    URL.revokeObjectURL(tempLink.href);
    tempLink.remove();
}

function closeDownloadArea() {
    document.getElementById('pass-download-btn').setAttribute("disabled", "disabled");
    document.getElementById("download-area").style.display = "none";
    document.getElementById('download-info-text').style.visibility = 'hidden';
    document.getElementById('website-name').value = '';
    document.getElementById('username').value = '';
}

//Form Control

function validateForm() {
    var Name = document.forms['review-form']["Name"].value;
    var Country = document.forms['review-form']["Country"].value;
    var Review = document.forms['review-form']["Review"].value;
    if (!(Name == '') && !(Country == "") && !(Review == "")) {
        SubmitContactForm();
    }
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbyNfY4LeCy5DvtgYHpFh0qjki1UZRBawkm6th3E9W2-bfjg66v66Wwfv_nIyT2vjhjNUQ/exec';
const form = document.forms['review-form'];

function SubmitContactForm() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyNfY4LeCy5DvtgYHpFh0qjki1UZRBawkm6th3E9W2-bfjg66v66Wwfv_nIyT2vjhjNUQ/exec';
    const form = document.forms['review-form'];
    var data = new FormData(form);
    var SubmitButton = document.getElementById("review-form-submit-btn");
    SubmitButton.innerHTML = 'Submitting';
    SubmitButton.setAttribute("disabled", "disabled");
    SubmitButton.onclick = "javascript:void()";
    fetch(scriptURL, {
            method: 'POST',
            body: data
        })
        .then(response => CloseContactForm())
        .catch(error => {
            alert("There was some error sending the message, Try again.");
            OnSubmittionError();
            console.log(error);
        })
}

function CloseContactForm() {
    var FORM = document.getElementById("user-review");
    console.log(FORM);
    FORM.innerHTML = "<h2 style='font-weight:500; font-size: 1.5rem;'>Thanks For Submitting Review</h2>";
}

function OnSubmittionError() {
    var SubmitButton = document.getElementById("review-form-submit-btn");
    SubmitButton.innerHTML = 'Submit Review';
    SubmitButton.removeAttribute("disabled");
}

// Password Generators

let arrayCharsCaps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let arrayCharsSmall = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let arrayNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let arraySym = ['!', '@', '#', '.', '-', '_', '=', '+', '?'];

function onlyAlpha(len) {
    let password = '';
    for (let index = 0; index < len; index++) {
        var what = Math.random();
        if (what <= 0.5) {
            var randomElement = arrayCharsCaps[Math.floor(Math.random() * 26)];
            password += randomElement;
        } else {
            var randomElement = arrayCharsSmall[Math.floor(Math.random() * 26)];
            password += randomElement;
        }
    }
    return password;
}

function onlyNums(len) {
    let password = '';
    for (let index = 0; index < len; index++) {
        var what = Math.random();
        if (what <= 0.3) {
            var randomElement = arrayCharsCaps[Math.floor(Math.random() * 26)];
            password += randomElement;
        } else if (what <= 0.6) {
            var randomElement = arrayCharsSmall[Math.floor(Math.random() * 26)];
            password += randomElement;
        } else {
            var randomElement = arrayNums[Math.floor(Math.random() * 10)];
            password += randomElement;
        }
    }
    return password;
}

function onlySymbols(len) {
    let password = '';
    for (let index = 0; index < len; index++) {
        var what = Math.random();
        if (what <= 0.3) {
            var randomElement = arrayCharsCaps[Math.floor(Math.random() * 26)];
            password += randomElement;
        } else if (what <= 0.6) {
            var randomElement = arrayCharsSmall[Math.floor(Math.random() * 26)];
            password += randomElement;
        } else {
            var randomElement = arraySym[Math.floor(Math.random() * 9)];
            password += randomElement;
        }
    }
    return password;
}

function everythingPassword(len) {
    let password = '';
    for (let index = 0; index < len; index++) {
        var what = Math.random();
        if (what <= 0.25) {
            var randomElement = arrayCharsCaps[Math.floor(Math.random() * 26)];
            password += randomElement;
        } else if (what <= 0.5) {
            var randomElement = arrayCharsSmall[Math.floor(Math.random() * 26)];
            password += randomElement;
        } else if (what <= 0.75) {
            var randomElement = arraySym[Math.floor(Math.random() * 9)];
            password += randomElement;
        } else {
            var randomElement = arrayNums[Math.floor(Math.random() * 10)];
            password += randomElement;
        }
    }
    return password;
}