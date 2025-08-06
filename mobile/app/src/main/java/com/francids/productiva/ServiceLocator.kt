package com.francids.productiva

import android.content.Context
import com.francids.productiva.data.PrincipalDatabase
import com.francids.productiva.data.repositories.NoteRepository

object ServiceLocator {
    private var noteRepository: NoteRepository? = null

    fun provideNoteRepository(context: Context): NoteRepository {
        return noteRepository ?: synchronized(this) {
            noteRepository ?: buildNoteRepository(context).also { noteRepository = it }
        }
    }

    private fun buildNoteRepository(context: Context): NoteRepository {
        val database = PrincipalDatabase.getDatabase(context)
        return NoteRepository(database.noteDao())
    }
}
