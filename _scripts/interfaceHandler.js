var toggleDiv = function (divID) {
    var div = document.getElementById(divID);
    if (div.classList.contains("hidden")) {
        div.classList.remove("hidden");
    } else {
        div.classList.add("hidden");
    }
}

bootstrap_alert = function () { }
bootstrap_alert.warning = function (message) {
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
}

var showHiperResult = function (result) {
    let resultText = 'No';
    if (result == 1) {
        resultText = 'Endocapilar and mesangial';
    }
    if (result == 2) {
        resultText = 'Mesangial';
    }
    if (result == 3) {
        resultText = 'Endocapilar';
    }
    var resultDiv = document.getElementById('hiperResult-div');
    resultDiv.innerText = resultText;
}

var showScleResult = function (result) {
    let resultText = 'No';
    if (result > 0.50) {
        resultText = 'Yes';
    }
    var resultDiv = document.getElementById('scleResult-div');
    resultDiv.innerText = resultText;
}