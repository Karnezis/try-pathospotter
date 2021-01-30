/**
 * Função que dá o preview da imagem quando o usuário realiza
 * o upload da mesma.
 * @param {*} event Evento de escolha de imagem.
 */
var loadFile = function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

/**
 * Função que pré-processa o arquivo, transformando
 * um arquivo de imagem em um Tensor para ser passado
 * para a rede neural.
 */
var preprocessFile = function (){
    var file = document.getElementById('imgsubmit').files[0]; // Pega os arquivos do input
    // Pega o tipo do arquivo
    var fileType = file.type;
    console.log(fileType);
    const acceptedImageTypes = ['image/jpeg', 'image/png']; // Tipos de imagem suportadas
    if (!acceptedImageTypes.includes(fileType.toLowerCase()) || !fileType==='image/tiff') { // Verifica se é uma imagem inválida
        bootstrap_alert.warning(`O arquivo ${file.name} não é uma imagem válida.`); // Alerta o usuário de que a imagem é inválida
    } else {
        // Esconde a div de input e mostra o spinner enquanto o programa calcula os dados
        toggleDiv('input-div');
        toggleDiv('spinner');
        let reader = new FileReader(); // Novo leitor de arquivo
        reader.onloadend = function () {
            // Começa um escopo de variáveis do Tensorflow, para poupar espaço
            tf.engine().startScope();
            let image = new Image(); // Faz um novo elemento da classe Imagem
            image.src = reader.result; // Pega a imagem do arquivo lido
            image.onload = async function (e) { // Ao carregar a imagem com sucesso
                let canvas = document.createElement('canvas'); // Cria um Canvas
                canvas.width = 224; // Define a altura do canvas como a desejada
                canvas.height = 224; // Define a largura do canvas como a desejada
                let ctx = canvas.getContext("2d"); // Pega o contexto do Canvas
                ctx.drawImage(this, 0, 0, 224, 224); // Desenha a imagem no contexto
                canvas.toDataURL(fileType); // O arquivo final é jogado no Canvas

                // Pega os dados da imagem do canvas
                let imagem = ctx.getImageData(0, 0, canvas.height, canvas.width);
                // Transforma os dados em um Tensor
                let inputTensor = tf.browser.fromPixels(imagem);
                // Debug
                //inputTensor.print()
                //console.log(inputTensor.shape);
                // Checa se os dados dentro do Tensor não são nulos
                if (inputTensor.dataSync() != null) {
                    // Redimensiona o Tensor para o tamanho da rede
                    intputTensor = inputTensor.resizeNearestNeighbor([224, 224]);
                    // Pega os valores em float do tensor
                    inputTensor = inputTensor.toFloat();
                    // Passa o tensor para ser predito pela rede
                    let hiperResult = await hiperPredict(inputTensor);
                    let scleResult = await sclerosisPredict(inputTensor);
                    // Mostra os resultados das redes na interface
                    showHiperResult(hiperResult);
                    showScleResult(scleResult);
                    // Debug
                    //console.log(hiperResult);
                    //console.log(scleResult);
                    // Esconde o spinner
                    toggleDiv("spinner");
                    // Mostra os resultados
                    toggleDiv("resultTable");
                    // Mostra o Tentar Novamente
                    toggleDiv("tryagain");
                    // Limpando espaço da memória
                    tf.disposeVariables();
                    tf.engine().endScope();
                }
            }
        }
        // Manda o leitor ler o arquivo
        reader.readAsDataURL(file);
    }
}