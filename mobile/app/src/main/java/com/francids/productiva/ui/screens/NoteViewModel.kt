package com.francids.productiva.ui.screens

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.francids.productiva.data.models.Note
import com.francids.productiva.data.repositories.NoteRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class NoteViewModel(
    private val repository: NoteRepository,
    private val noteId: String,
) : ViewModel() {
    private val _note = MutableStateFlow<Note?>(null)
    val note: StateFlow<Note?> = _note
    var newTitle by mutableStateOf("")
    var newContent by mutableStateOf("")

    init {
        viewModelScope.launch {
            repository.getNoteById(noteId)?.let { note ->
                _note.value = note
                newTitle = note.title
                newContent = note.content
            }
        }
    }

    fun onTitleChange(newText: String) {
        newTitle = newText
        updateNote()
    }

    fun onContentChange(newText: String) {
        newContent = newText
        updateNote()
    }

    private fun updateNote() {
        viewModelScope.launch {
            _note.value?.let { currentNote ->
                val updatedNote = currentNote.copy(
                    title = newTitle,
                    content = newContent,
                )
                repository.updateNote(updatedNote)
            }
        }
    }

    fun deleteNote() {
        viewModelScope.launch {
            _note.value?.let { note ->
                repository.deleteNote(note)
            }
        }
    }
}
