const FormatDate = require('../function/formatDate');
const Notes = require('../model/notesModel');
const Yup = require('yup');

module.exports = { 

    async store(req, res) {
        
        const schema = Yup.object({
            note_content: Yup.string().required()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ success: false, message: "Campos obrigatórios não foram informados!" });

        const createAt = FormatDate.formatDate(new Date());
        const updateAt = FormatDate.formatDate(new Date());
        const note_content = req.body.note_content;
        const company_id = req.company_id;
        const employee_id = req.user_id;

        try {

            const responseNotes = await Notes.create({
                createAt,
                updateAt,
                note_content,
                employee_id,
                company_id
            });

            if(!responseNotes)
                return res.status(400).json({ success: false, message: "Falha ao criar nota!" });

            return res.status(200).json({ success: true, message: "Nota cadastrado com sucesso!" });

        } catch (error) {
            console.log(`Erro: ${error}`);
            return res.status(400).json({ success: false, message: "Falha ao criar nota!" });
        }
    },

    async index(req, res) {

        const company_id = req.company_id;
        const employee_id = req.user_id;
        
        try {
            
            const responseNotes = await Notes.find(
                { company_id, employee_id },
                { createAt: 0, updateAt: 0, company_id: 0, __v: 0 }
                ).sort({ check: 1, createAt: -1 });
    
            if (!responseNotes)
                return res.status(400).json({ message: "Não foi possível listar as notas!" });
    
            return res.status(200).json({ success: true, message: responseNotes });

        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(400).json({ success: false, message: "Falha ao listar notas!" });
        }
    },

    async update(req, res) {

        const schema = Yup.object({
            note_content: Yup.string().required()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ success: false, message: "Campos obrigatórios não foram preenchidos!" });

        const updateAt = FormatDate.formatDate(new Date());
        const note_content = req.body.note_content;
        const company_id = req.company_id;
        const employee_id = req.user_id;
        const _id = req.params.id;

        try {
  
            const responseNotes = await Notes.findOneAndUpdate({ _id, company_id, employee_id }, {
                updateAt,
                note_content
            });

            if(!responseNotes)
                return res.status(400).json({ success: false, message: "Falha ao atualizar nota!" });
        
            return res.status(200).json({ success: true, message: "Nota atualizado com sucesso!" });
            
        } catch (error) {

            console.log(`Erro: ${error}`)

            return res.status(400).json({ success: false, message: "Falha ao atualizar nota!" });
        }
    },

    async destroy(req, res) {

        const _id = req.params.id;
        const company_id = req.company_id;
        const employee_id = req.user_id;
        
        try {
            
            const responseNotes = await Notes.findOneAndDelete({ _id, company_id, employee_id });

            if(!responseNotes)
                return res.status(400).json({ success: false, message: "Falha ao excluir nota!" });
    
            return res.status(200).json({ success: true, message: "Nota excluído com sucesso!" });

        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(400).json({ success: false, message: "Falha ao deletar nota!" });
        }
    }
}