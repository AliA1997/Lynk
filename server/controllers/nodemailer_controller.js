module.exports = {
    sendEmail: (req, res) => {
        const { name, email, text } = req.body
        let transporter = nodemailer.createTransport({

        })
        res.status(200).json()
    }
}