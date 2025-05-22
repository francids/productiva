package com.francids.productiva.ui.screens

import androidx.compose.ui.text.input.TextFieldValue
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class NoteViewModel : ViewModel() {
    private val _noteContent = MutableStateFlow(TextFieldValue(""))

    val noteContent: StateFlow<TextFieldValue> = _noteContent.asStateFlow()

    fun updateNoteContent(newContent: TextFieldValue) {
        _noteContent.value = newContent
    }
}