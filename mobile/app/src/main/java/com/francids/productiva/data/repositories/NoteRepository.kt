package com.francids.productiva.data.repositories

import com.francids.productiva.data.NoteDao
import com.francids.productiva.data.models.Note

class NoteRepository(private val dao: NoteDao) {
    fun getNotes() = dao.getAll()
    fun getNoteById(id: String) = dao.getById(id)
    suspend fun insertNote(note: Note) = dao.insert(note)
    suspend fun updateNote(note: Note) = dao.update(note)
    suspend fun deleteNote(note: Note) = dao.delete(note)
}
