module.exports = {
    stuff: {
        value: {}
    },

    handleChange(value){
        this.stuff.value = value
        return this.stuff
    }
}