package com.francids.productiva.ui.screens

import com.francids.productiva.data.models.Task
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

@ExperimentalCoroutinesApi
class HomeViewModelTests {

    private lateinit var viewModel: HomeViewModel
    private val testDispatcher = StandardTestDispatcher()

    @BeforeEach
    fun setUp() {
        Dispatchers.setMain(testDispatcher)
        viewModel = HomeViewModel()
    }

    @AfterEach
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `addTask_addsTaskToStateFlow`() = runTest {
        val initialTasks = viewModel.tasks.first()
        assertEquals(3, initialTasks.size, "Initial tasks should be 3 from sample data") // Assuming 3 sample tasks

        viewModel.addTask("Test Title", "Test Desc")
        val newTasks = viewModel.tasks.first()
        assertEquals(4, newTasks.size) // 3 sample + 1 new
        val addedTask = newTasks.find { it.title == "Test Title" }
        assertNotNull(addedTask)
        assertEquals("Test Desc", addedTask?.description)
    }

    @Test
    fun `getTaskById_returnsCorrectTask_orNull`() = runTest {
        viewModel.addTask("Task 1", "Desc 1")
        val tasks = viewModel.tasks.first()
        val task1Id = tasks.find { it.title == "Task 1" }?.id
        assertNotNull(task1Id)

        val foundTask = viewModel.getTaskById(task1Id!!)
        assertNotNull(foundTask)
        assertEquals("Task 1", foundTask?.title)

        val notFoundTask = viewModel.getTaskById("non-existent-id")
        assertNull(notFoundTask)
    }

    @Test
    fun `updateTask_modifiesExistingTask`() = runTest {
        viewModel.addTask("Original Title", "Original Desc")
        val tasks = viewModel.tasks.first()
        val taskToUpdate = tasks.find { it.title == "Original Title" }
        assertNotNull(taskToUpdate)

        val originalUpdatedAt = taskToUpdate!!.updatedAt
        val updatedTask = taskToUpdate.copy(title = "Updated Title", description = "Updated Desc")
        
        // Advance time slightly to ensure updatedAt changes if Clock.System.now() is used
        testDispatcher.scheduler.advanceTimeBy(100)
        viewModel.updateTask(updatedTask)

        val currentTasks = viewModel.tasks.first()
        val taskInState = currentTasks.find { it.id == taskToUpdate.id }
        assertNotNull(taskInState)
        assertEquals("Updated Title", taskInState?.title)
        assertEquals("Updated Desc", taskInState?.description)
        assertNotEquals(originalUpdatedAt, taskInState?.updatedAt, "updatedAt should have changed")
    }

    @Test
    fun `deleteTask_removesTaskFromStateFlow`() = runTest {
        viewModel.addTask("Task To Delete", "Desc Delete")
        viewModel.addTask("Task To Keep", "Desc Keep")

        var currentTasks = viewModel.tasks.first()
        val taskToDelete = currentTasks.find { it.title == "Task To Delete" }
        assertNotNull(taskToDelete)
        assertEquals(5, currentTasks.size) // 3 sample + 2 added

        viewModel.deleteTask(taskToDelete!!.id)
        currentTasks = viewModel.tasks.first()
        assertEquals(4, currentTasks.size)
        assertNull(currentTasks.find { it.id == taskToDelete.id })
        assertNotNull(currentTasks.find { it.title == "Task To Keep" })
    }

    @Test
    fun `toggleTaskCompleted_updatesCompletionStatus`() = runTest {
        viewModel.addTask("Toggle Task", "Desc Toggle")
        var currentTasks = viewModel.tasks.first()
        val taskToToggle = currentTasks.find { it.title == "Toggle Task" }
        assertNotNull(taskToToggle)
        assertEquals(false, taskToToggle!!.isCompleted)
        val initialUpdatedAt = taskToToggle.updatedAt

        // Advance time slightly
        testDispatcher.scheduler.advanceTimeBy(100)
        viewModel.toggleTaskCompleted(taskToToggle.id)
        currentTasks = viewModel.tasks.first()
        var updatedTaskInState = currentTasks.find { it.id == taskToToggle.id }
        assertNotNull(updatedTaskInState)
        assertEquals(true, updatedTaskInState?.isCompleted)
        assertNotEquals(initialUpdatedAt, updatedTaskInState?.updatedAt, "updatedAt should change on first toggle")
        val firstToggleUpdatedAt = updatedTaskInState!!.updatedAt

        // Advance time slightly again
        testDispatcher.scheduler.advanceTimeBy(100)
        viewModel.toggleTaskCompleted(taskToToggle.id)
        currentTasks = viewModel.tasks.first()
        updatedTaskInState = currentTasks.find { it.id == taskToToggle.id }
        assertNotNull(updatedTaskInState)
        assertEquals(false, updatedTaskInState?.isCompleted)
        assertNotEquals(firstToggleUpdatedAt, updatedTaskInState?.updatedAt, "updatedAt should change on second toggle")
    }
}
