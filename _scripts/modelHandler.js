/**
 * Função que: pré-processa a imagem para alimentar a rede de hipercelularidade;
 * importa o modelo para a memória do programa;
 * prevê o resultado da imagem no modelo;
 * trata os dados do resultado da predição.
 * @param {*} image Imagem que desejamos prever a classe.
 */
async function hiperPredict(image) {
    // Redimensionamento da imagem
    // image = tf.image.resizeBilinear(image, [224, 224])
    // Normalização do Modelo de Hipercelularidade
    const norm = tf.scalar(255);
    image = image.div(norm);
    // Conversão para Float
    image = image.toFloat();
    // Expansão de dimensões
    image = image.expandDims();
    // Carregando o Modelo de Hipercelularidade
    let hiper_model = await tf.loadLayersModel('_models/hiper_model/model.json');
    //console.log("Modelo carregado.")
    // Realiza a Predição
    let predict = await hiper_model.predict(image);
    //predict.print();
    // Pega do vetor de possibilidades de classes
    // Vê qual das classes tem a maior probabilidade
    let classe = predict.argMax(1);
    // Pega os dados do tensor de classe e retorna
    const predictData = classe.dataSync();
    //predict.argMax(1).print();
    return predictData[0];
}

/**
 * Função que: pré-processa a imagem para alimentar a rede de esclerose;
 * importa o modelo para a memória do programa;
 * prevê o resultado da imagem no modelo;
 * trata os dados do resultado da predição.
 * @param {*} image Imagem que desejamos prever a classe.
 */
async function sclerosisPredict(image) {
    // Redimensionamento da imagem
    //image = tf.image.resizeBilinear(image, [224, 224])
    // Normalização do Modelo de Esclerose
    const norm = tf.scalar(255);
    image = image.div(norm);
    // Expansão de dimensões
    image = image.expandDims();
    // Carregando o Modelo de Esclerose
    let sclerosis_model = await tf.loadLayersModel('_models/sclerosis_model/model.json');
    // Realiza a Predição
    let predict = await sclerosis_model.predict(image);
    // Pega os dados do tensor predito, no caso, a probabilidade de ter sclerose
    const predictData = predict.dataSync();
    // Retorna somente a probabilidade
    return predictData[0];
}