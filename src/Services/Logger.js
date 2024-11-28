exports.infoLog = (message, data) => {
    console.log(`[${new Date().toISOString()}] ${message}`);
    if (data) {
        console.log(JSON.stringify(data));
    }
}

exports.errorLog = (message, error) => {
    console.error(`[${new Date().toISOString()}] ${message}.`);
    if(error) {
        console.log(error);
    }
}