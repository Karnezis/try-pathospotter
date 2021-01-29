async function hiperPredict(image) {
    // Normalização do Modelo de Hipercelularidade
    const norm = tf.scalar(255);
    image = image.div(norm);
    // Expansão de dimensões
    image = image.expandDims();
    // Carregando o Modelo de Hipercelularidade
    let hiper_model = await tf.loadLayersModel('_models/hiper_model/model.json');
    //console.log("Modelo carregado.")
    // Realiza a Predição
    let predict = await hiper_model.predict(image);
    // Pega do vetor de possibilidades a classe correta
    let classe = predict.argMax(1);
    const predictData = classe.dataSync();
    //predict.argMax(1).print();
    return predictData[0];
}

async function sclerosisPredict(image) {
    // Normalização do Modelo de Esclerose
    const norm = tf.scalar(255);
    image = image.div(norm);
    // Expansão de dimensões
    image = image.expandDims();
    // Carregando o Modelo de Esclerose
    let sclerosis_model = await tf.loadLayersModel('_models/sclerosis_model/model.json');
    // Realiza a Predição
    let predict = await sclerosis_model.predict(image);
    const predictData = predict.dataSync();
    return predictData[0];
}