var toggleInput = function () {
    var inputDiv = document.getElementById('input-div');
    if (inputDiv.style.display == "") {
        inputDiv.style.display = "none";
    } else {
        inputDiv.style.display = "";
    }
}

bootstrap_alert = function () { }
bootstrap_alert.warning = function (message) {
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
}