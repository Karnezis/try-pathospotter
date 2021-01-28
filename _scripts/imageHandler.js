var loadFile = function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

var preprocessFile = function (){
    var file = document.getElementById('imgsubmit').files[0]; // Pega os arquivos do input
    // Pega o tipo do arquivo
    var fileType = file.type;
    console.log(fileType);
    const acceptedImageTypes = ['image/jpeg', 'image/png']; // Tipos de imagem suportadas
    if (!acceptedImageTypes.includes(fileType.toLowerCase()) || !fileType==='image/tiff') { // Verifica se é uma imagem inválida
        bootstrap_alert.warning(`O arquivo ${file.name} não é uma imagem válida.`);
    } else {
        toggleInput();
    }
        /*
    } else {
        let reader = new FileReader(); // Novo leitor de arquivo
        proms[i] = await new Promise( // Espera a promessa que será instanciada se resolver
            async function (resolve, reject) { // Define uma função assíncrona para a promessa
                // Quando o leitor terminar de carregar uma imagem
                reader.onloadend = function () {
                    // Começa um escopo de variáveis do Tensorflow, para poupar espaço
                    tf.engine().startScope();
                    let image = new Image(); // Faz um novo elemento da classe Imagem
                    image.src = reader.result; // Pega a imagem do arquivo lido
                    image.onload = async function (e) { // Ao carregar a imagem com sucesso
                        let canvas = document.createElement('canvas'); // Cria um Canvas
                        canvas.width = val; // Define a altura do canvas como a desejada
                        canvas.height = val; // Define a largura do canvas como a desejada
                        let ctx = canvas.getContext("2d"); // Pega o contexto do Canvas
                        ctx.drawImage(this, 0, 0, val, val); // Desenha a imagem no contexto
                        canvas.toDataURL(fileType); // O arquivo final é jogado no Canvas

                        // Pega os dados da imagem do canvas
                        let imagem = ctx.getImageData(0, 0, canvas.height, canvas.width);
                        // Transforma os dados em um Tensor
                        let inputTensor = tf.browser.fromPixels(imagem);
                        // Checa se os dados dentro do Tensor não são nulos
                        if (inputTensor.dataSync() != null) {
                            // Redimensiona o Tensor para o tamanho da rede
                            intputTensor = inputTensor.resizeNearestNeighbor([val, val]);
                            // Pega os valores em float do tensor
                            inputTensor = inputTensor.toFloat();
                            // Passa o tensor para ser predito pela rede
                            let newTensor = await vggPredict(inputTensor);
                            //console.log(tensores[i].toString());
                            // Guarda o nome da imagem no Tensor
                            newTensor.name = file.name;
                            // Guarda a imagem em base 64 no Tensor
                            newTensor.src = reader.result;
                            // Checa se já guardei esse tensor
                            if (!tensores.includes(newTensor)) {
                                // Coloca o tensor na lista
                                tensores.push(newTensor);
                                // Printa o nome do tensor
                                console.log(tensores[(tensores.length - 1)].name);
                                // Resolve a promessa do tensor (predição)
                                resolve(tensores[(tensores.length - 1)]);
                            }
                            // Limpando espaço da memória
                            tf.disposeVariables();
                            tf.engine().endScope();
                        }
                    }
                }
                // Manda o leitor ler o arquivo
                reader.readAsDataURL(file);
            }).then(() => {
                // Vejo em qual tempo tudo acabou
                let endTime = new Date().getTime();
                // Calculo quanto tempo levou
                let progTime = endTime - bgnTime;
                // Chamo a função de atualizar a barra de progresso
                update((++actProg), progTime, arqvs.length, invalidFiles);
                // Liberando mais memória
                tf.dispose();
            });
    }
}
*/
}