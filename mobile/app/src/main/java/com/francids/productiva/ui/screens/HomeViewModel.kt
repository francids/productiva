package com.francids.productiva.ui.screens

import androidx.compose.ui.tooling.preview.datasource.LoremIpsum
import androidx.lifecycle.ViewModel
import com.francids.productiva.data.models.Note
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class HomeViewModel : ViewModel() {
    private val _notes = MutableStateFlow<List<Note>>(
        listOf(
            Note(
                title = "Lorem Ipsum",
                content = LoremIpsum(25).values.joinToString(" "),
            ),
            Note(
                title = "Create productive project",
                content = "Create a project in android studio and upload it to github.",
            ),
            Note(
                title = "Shopping list",
                content = "Buy milk, bread and eggs.",
            ),
            Note(
                title = "Dinner ideas",
                content = "Pasta with tomato sauce and meatballs.",
            ),
            Note(
                title = "Reminder",
                content = "Call mom.",
            ),
        )
    )

    val notes: StateFlow<List<Note>> = _notes.asStateFlow()
}
