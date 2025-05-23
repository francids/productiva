package com.francids.productiva.ui.screens

import androidx.compose.ui.tooling.preview.datasource.LoremIpsum
import androidx.lifecycle.ViewModel
import com.francids.productiva.data.models.Note
import com.francids.productiva.data.models.Task
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.datetime.Clock

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

    private val _tasks = MutableStateFlow<List<Task>>(
        listOf(
            Task(
                title = "Grocery Shopping",
                description = "Buy groceries for the week: milk, eggs, bread, chicken, and vegetables."
            ),
            Task(
                title = "Complete Project Proposal",
                description = "Finish writing the project proposal and send it for review by Friday."
            ),
            Task(
                title = "Book Doctor's Appointment"
            )
        )
    )

    val tasks: StateFlow<List<Task>> = _tasks.asStateFlow()

    fun addTask(title: String, description: String?) {
        val newTask = Task(
            title = title,
            description = description ?: ""
        )
        _tasks.value = _tasks.value + newTask
    }

    fun getTaskById(taskId: String): Task? {
        return _tasks.value.find { it.id == taskId }
    }

    fun updateTask(updatedTask: Task) {
        val currentList = _tasks.value
        val index = currentList.indexOfFirst { it.id == updatedTask.id }
        if (index != -1) {
            val newList = currentList.toMutableList()
            newList[index] = updatedTask.copy(updatedAt = Clock.System.now())
            _tasks.value = newList
        }
    }

    fun deleteTask(taskId: String) {
        _tasks.value = _tasks.value.filterNot { it.id == taskId }
    }

    fun toggleTaskCompleted(taskId: String) {
        val task = getTaskById(taskId)
        if (task != null) {
            val updatedTask = task.copy(
                isCompleted = !task.isCompleted,
                updatedAt = Clock.System.now()
            )
            updateTask(updatedTask)
        }
    }
}
