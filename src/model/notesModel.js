const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    createAt: { 
        type: Date,
        required: true
    }, 
    updateAt: {
        type: Date,
        required: true
    },
    note_content: { 
        type: String,
        required: true
    }, 
    check: { 
        type: Boolean,
        default: false
    },
    employee_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }, 
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});

module.exports = mongoose.model('Note', NoteSchema);