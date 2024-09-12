const Notes = require('../model/notesModel');
const FormatDate = require('../function/formatDate');
const Yup = require('yup');

module.exports = { 

    async update(req, res) {

        const schema = Yup.object({
            check: Yup.boolean().required()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ success: false, message: "Campos obrigatórios não foram preenchidos!" });

        const updateAt = FormatDate.formatDate(new Date());
        const check = req.body.check;
        const company_id = req.company_id;
        const employee_id = req.user_id;
        const _id = req.params.id;

        try {
  
            const responseNotes = await Notes.findOneAndUpdate({ _id, company_id, employee_id }, {
                updateAt,
                check
            });

            if(!responseNotes)
                return res.status(400).json({ success: false, message: "Falha ao atualizar nota!" });
        
            return res.status(200).json({ success: true, message: "Nota atualizado com sucesso!" });
            
        } catch (error) {

            console.log(`Erro: ${error}`)

            return res.status(400).json({ success: false, message: "Falha ao atualizar nota!" });
        }
    },
}