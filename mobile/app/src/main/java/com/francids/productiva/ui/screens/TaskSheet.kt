package com.francids.productiva.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Check
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.FilledTonalIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.IconButtonDefaults.smallContainerSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@OptIn(ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun TaskSheet(
    homeViewModel: HomeViewModel,
    taskViewModel: TaskViewModel = viewModel(),
    taskId: String? = null,
    onDismiss: () -> Unit
) {
    val taskTitle by taskViewModel.taskTitle.collectAsState()
    val taskDescription by taskViewModel.taskDescription.collectAsState()

    LaunchedEffect(taskId) {
        val existingTask = taskId?.let { homeViewModel.getTaskById(it) }
        taskViewModel.loadTask(existingTask)
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(
                vertical = 16.dp,
                horizontal = 20.dp
            ),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        BasicTextField(
            value = taskTitle,
            onValueChange = taskViewModel::onTaskTitleChange,
            textStyle = MaterialTheme.typography.titleMedium,
            decorationBox = { innerTextField ->
                if (taskTitle.isEmpty()) {
                    Text(
                        text = "Title",
                        style = MaterialTheme.typography.titleSmall,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
                    )
                }
                innerTextField()
            },
            modifier = Modifier.fillMaxWidth()
        )

        BasicTextField(
            value = taskDescription,
            onValueChange = taskViewModel::onTaskDescriptionChange,
            textStyle = MaterialTheme.typography.bodyMedium.copy(
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.75f)
            ),
            decorationBox = { innerTextField ->
                if (taskDescription.isEmpty()) {
                    Text(
                        text = "Description",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f)
                    )
                }
                innerTextField()
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.End,
        ) {
            IconButton(
                onClick = onDismiss,
                modifier = Modifier.size(
                    smallContainerSize(
                        IconButtonDefaults.IconButtonWidthOption.Wide,
                    ),
                ),
            ) {
                Icon(
                    imageVector = Icons.Rounded.Close,
                    contentDescription = "Cancel",
                )
            }

            FilledTonalIconButton(
                onClick = { saveTask(homeViewModel, taskViewModel, taskId, onDismiss) },
                modifier = Modifier.size(
                    smallContainerSize(
                        IconButtonDefaults.IconButtonWidthOption.Wide,
                    ),
                ),
            ) {
                Icon(
                    imageVector = Icons.Rounded.Check,
                    contentDescription = "Save",
                )
            }
        }
    }
}

private fun saveTask(
    homeViewModel: HomeViewModel,
    taskViewModel: TaskViewModel,
    taskId: String?,
    onDismiss: () -> Unit
) {
    val currentTitle = taskViewModel.taskTitle.value
    val currentDescription = taskViewModel.taskDescription.value

    if (taskId == null) {
        homeViewModel.addTask(
            title = currentTitle,
            description = currentDescription
        )
    } else {
        homeViewModel.getTaskById(taskId)?.let { existingTask ->
            val updatedTask = existingTask.copy(
                title = currentTitle,
                description = currentDescription
            )
            homeViewModel.updateTask(updatedTask)
        }
    }
    onDismiss()
}