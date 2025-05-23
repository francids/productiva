package com.francids.productiva.ui.screens

import androidx.lifecycle.ViewModel
import com.francids.productiva.data.models.Task
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class TaskViewModel : ViewModel() {
    private val _taskTitle = MutableStateFlow("")
    val taskTitle: StateFlow<String> = _taskTitle.asStateFlow()

    fun onTaskTitleChange(newTitle: String) {
        _taskTitle.value = newTitle
    }

    private val _taskDescription = MutableStateFlow("")
    val taskDescription: StateFlow<String> = _taskDescription.asStateFlow()

    fun onTaskDescriptionChange(newDescription: String) {
        _taskDescription.value = newDescription
    }

    fun loadTask(task: Task?) {
        _taskTitle.value = task?.title ?: ""
        _taskDescription.value = task?.description ?: ""
    }
}
