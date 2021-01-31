/**
 * Função que dá o preview da imagem quando o usuário realiza
 * o upload da mesma.
 * @param {*} event Evento de escolha de imagem.
 */
var loadFile = function (event) {
    let reader = new FileReader();
    reader.onload = function () {
        let output = document.getElementById('output');
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
    // console.log(tf.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED')); // Debug
    let file = document.getElementById('imgsubmit').files[0]; // Pega os arquivos do input
    // Pega o tipo do arquivo
    let fileType = file.type;
    //console.log(fileType);
    acceptedImageTypes = ['image/jpeg', 'image/png']; // Tipos de imagem suportadas
    if (!acceptedImageTypes.includes(fileType.toLowerCase()) || !fileType==='image/tiff') { // Verifica se é uma imagem inválida
        bootstrap_alert.warning(`O arquivo ${file.name} não é uma imagem válida.`); // Alerta o usuário de que a imagem é inválida
    } else {
        // Limpa espaço da memória
        delete(acceptedImageTypes);
        // Esconde a div de input e mostra o spinner enquanto o programa calcula os dados
        toggleDiv('input-div');
        toggleDiv('spinner');
        let reader = new FileReader(); // Novo leitor de arquivo
        reader.onloadend = function () {
            // Começa um escopo de variáveis do Tensorflow, para poupar espaço
            //tf.engine().startScope();
            let image = new Image(); // Faz um novo elemento da classe Imagem
            image.src = reader.result; // Pega a imagem do arquivo lido
            image.onload = async function (e) { // Ao carregar a imagem com sucesso
                canvas = document.createElement('canvas'); // Cria um Canvas
                canvas.setAttribute("id", "canvasID");
                canvas.width = 224; //this.width; // Define a altura do canvas como a desejada
                canvas.height = 224; //this.height; // Define a largura do canvas como a desejada
                let ctx = canvas.getContext("2d"); // Pega o contexto do Canvas
                ctx.drawImage(this, 0, 0, 224, 224); // Desenha a imagem no contexto
                canvas.toDataURL(fileType); // O arquivo final é jogado no Canvas

                /*
                // OpenCV fazendo o redimensionamento da imagem
                let src = cv.imread(canvas);
                let dst = new cv.Mat();
                let dsize = new cv.Size(224, 224);
                cv.resize(src, dst, dsize, 0, 0, cv.INTER_LINEAR);
                cv.imshow(canvas, dst);
                */

                // Pega os dados da imagem do canvas
                imagem = ctx.getImageData(0, 0, canvas.height, canvas.width);
                // Limpa espaço da memória
                delete(canvas);
                // Transforma os dados em um Tensor
                let inputTensor = tf.browser.fromPixels(imagem);
                // Limpa espaço da memória
                delete(imagem);
                // Debug
                //inputTensor.print()
                //console.log(inputTensor.shape);
                // Checa se os dados dentro do Tensor não são nulos
                if (inputTensor.data() != null) {
                    // Redimensiona o Tensor para o tamanho da rede
                    // inputTensor = inputTensor.resizeNearestNeighbor([224, 224]);
                    // Pega os valores em float do tensor
                    // inputTensor = inputTensor.toFloat();
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
                    //tf.disposeVariables();
                    //tf.engine().endScope();
                }
            }
        }
        // Manda o leitor ler o arquivo
        reader.readAsDataURL(file);
    }
}