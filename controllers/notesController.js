// notesController.js
const Note = require('../models/notes.model');

exports.createNote = async (req, res) => {
  try {
    const { esporte, data, dia, local, comentario, linkReserva } = req.body;
    const newNote = new Note({
      esporte,
      data,
      dia,
      local,
      comentario,
      linkReserva,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating note' });
  }
};
