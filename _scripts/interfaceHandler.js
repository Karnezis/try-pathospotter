/**
 * Função que muda a visibilidade de uma divisão da interface.
 * @param {String} divID ID da divisão a ser mudada.
 */
var toggleDiv = function (divID) {
    var div = document.getElementById(divID);
    if (div.classList.contains("hidden")) {
        div.classList.remove("hidden");
    } else {
        div.classList.add("hidden");
    }
}

/**
 * Alerta bootstrap de que algo está errado.
 * Usado para informar que um arquivo é inválido.
 */
bootstrap_alert = function () { }
bootstrap_alert.warning = function (message) {
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
}

/**
 * Trata o resultado numérico apresentado pela rede neural
 * que prediz hipercelularidade para algo legível pelo
 * ser humano na interface do programa.
 * @param {Number} result Resultado da rede neural.
 */
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

/**
 * Trata o resultado da rede neural que prediz esclerose
 * e mostra na interface do programa.
 * @param {Number} result Resultado previsto pela rede.
 */
var showScleResult = function (result) {
    let resultText = 'No';
    if (result > 0.50) {
        resultText = 'Yes';
    }
    var resultDiv = document.getElementById('scleResult-div');
    resultDiv.innerText = resultText;
}

var tryAgain = function () {
    toggleDiv("resultTable");
    toggleDiv("tryagain");
    toggleDiv("input-div");
}