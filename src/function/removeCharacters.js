function removeCharacters(desc, type) {
    return desc.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').trim();
}

module.exports = { removeCharacters };