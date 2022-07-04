exports.generate = (character, count) => {
    let result = '';
    for (let i = 0; i < count; i++){
        result = result.concat(character);
    }
    return result;
}