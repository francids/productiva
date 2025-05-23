package com.francids.productiva.ui.screens

import com.francids.productiva.data.models.Task
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.uuid.Uuid

@ExperimentalCoroutinesApi
class TaskViewModelTests {

    private lateinit var viewModel: TaskViewModel

    @BeforeEach
    fun setUp() {
        viewModel = TaskViewModel()
    }

    @Test
    fun `loadTask_nullTask_setsEmptyStrings`() {
        viewModel.loadTask(null)
        assertEquals("", viewModel.taskTitle.value)
        assertEquals("", viewModel.taskDescription.value)
    }

    @Test
    fun `loadTask_withTask_setsTitleAndDescription`() {
        val sampleTask = Task(
            id = Uuid.randomUUID().toString(), // id is required but not used in loadTask logic
            title = "Loaded Title",
            description = "Loaded Desc"
        )
        viewModel.loadTask(sampleTask)
        assertEquals("Loaded Title", viewModel.taskTitle.value)
        assertEquals("Loaded Desc", viewModel.taskDescription.value)
    }

    @Test
    fun `onTaskTitleChange_updatesTitleStateFlow`() {
        viewModel.onTaskTitleChange("New Title")
        assertEquals("New Title", viewModel.taskTitle.value)
    }

    @Test
    fun `onTaskDescriptionChange_updatesDescriptionStateFlow`() {
        viewModel.onTaskDescriptionChange("New Desc")
        assertEquals("New Desc", viewModel.taskDescription.value)
    }
}
