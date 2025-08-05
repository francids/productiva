package com.francids.productiva.ui.screens

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import com.francids.productiva.data.models.Note
import kotlin.time.ExperimentalTime

class NoteViewModel : ViewModel() {
    val note = mutableStateOf<Note?>(null)
    var newTitle by mutableStateOf("")
    var newContent by mutableStateOf("")

    init {
        note.value?.let {
            newTitle = it.title
            newContent = it.content
        }
    }

    @OptIn(ExperimentalTime::class)
    private fun updateNote() {
        note.value?.let { currentNote ->
            val updatedNote = currentNote.copy(
                title = newTitle,
                content = newContent,
            )
            print(updatedNote)
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
}
