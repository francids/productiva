package com.francids.productiva.ui.screens

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.francids.productiva.data.models.Note
import com.francids.productiva.data.repositories.NoteRepository
import kotlinx.coroutines.launch
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
class HomeViewModel(
    private val noteRepository: NoteRepository,
) : ViewModel() {
    fun createNote(): String {
        val newNoteId = Uuid.random().toString()
        viewModelScope.launch {
            val newNote = Note(id = newNoteId, title = "", content = "")
            noteRepository.insertNote(newNote)
        }
        return newNoteId
    }

    fun createTask() {}

    fun createList() {}
}
