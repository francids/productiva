package com.francids.productiva.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Done
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskSheet(
    homeViewModel: HomeViewModel,
    taskViewModel: TaskViewModel = viewModel(),
    taskId: String? = null,
    onDismiss: () -> Unit
) {
    val taskTitle by taskViewModel.taskTitle.collectAsState()
    val taskDescription by taskViewModel.taskDescription.collectAsState()

    LaunchedEffect(key1 = taskId) {
        if (taskId != null) {
            val existingTask = homeViewModel.getTaskById(taskId)
            taskViewModel.loadTask(existingTask)
        } else {
            taskViewModel.loadTask(null)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            IconButton(
                onClick = { onDismiss() },
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                )
            }
            Text(
                text = if (taskId == null) "New Task" else "Edit Task",
                style = MaterialTheme.typography.titleLarge,
                modifier = Modifier.weight(1f),
            )
            IconButton(
                onClick = {
                    val currentTitle = taskViewModel.taskTitle.value
                    val currentDescription = taskViewModel.taskDescription.value

                    if (taskId == null) {
                        homeViewModel.addTask(
                            title = currentTitle, description = currentDescription
                        )
                    } else {
                        val existingTask = homeViewModel.getTaskById(taskId)
                        if (existingTask != null) {
                            val updatedTask = existingTask.copy(
                                title = currentTitle, description = currentDescription
                            )
                            homeViewModel.updateTask(updatedTask)
                        }
                    }
                    onDismiss()
                },
            ) {
                Icon(
                    imageVector = Icons.Filled.Done,
                    contentDescription = "Save Task",
                )
            }
        }

        Spacer(
            modifier = Modifier.height(16.dp),
        )

        OutlinedTextField(
            value = taskTitle,
            onValueChange = { taskViewModel.onTaskTitleChange(it) },
            label = { Text("Title") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        Spacer(
            modifier = Modifier.height(16.dp),
        )
        OutlinedTextField(
            value = taskDescription,
            onValueChange = {
                taskViewModel.onTaskDescriptionChange(it)
            },
            label = {
                Text("Description")
            },
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
        )
    }
}
