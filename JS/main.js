function generatePassword() {
    var password = '';
    let len = parseInt(document.getElementById("pass-len-input").value);
    let arrayCharsCaps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let arrayCharsSmall = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (let index = 0; index < len; index++) {
        var what = Math.random();
        if (what < 0.5){
            var randomElement= arrayCharsCaps[Math.floor(Math.random() * 26)]; 
            password += randomElement;
        }
        else{
            var randomElement= arrayCharsSmall[Math.floor(Math.random() * 26)]; 
            password += randomElement;
        }
    }
    var output = document.getElementById("pass-output-display");
    output.value = password;
}

function copyToClipboard() {
    let password = document.getElementById("pass-output-display");
    navigator.clipboard.writeText(password.value);
}