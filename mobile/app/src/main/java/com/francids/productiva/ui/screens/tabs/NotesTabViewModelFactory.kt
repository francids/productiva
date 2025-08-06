package com.francids.productiva.ui.screens.tabs

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.francids.productiva.data.repositories.NoteRepository

class NotesTabViewModelFactory(private val repository: NoteRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(NotesTabViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST") return NotesTabViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
