package com.francids.productiva.ui.screens

import androidx.compose.foundation.layout.Column
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
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.francids.productiva.ui.screens.HomeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TaskScreen(
    navController: NavController,
    homeViewModel: HomeViewModel,
    taskViewModel: TaskViewModel = viewModel(),
    taskId: String? = null
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

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (taskId == null) "New Task" else "Edit Task") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                },
                actions = {
                    IconButton(onClick = {
                        val currentTitle = taskViewModel.taskTitle.value
                        val currentDescription = taskViewModel.taskDescription.value

                        if (taskId == null) {
                            homeViewModel.addTask(title = currentTitle, description = currentDescription)
                        } else {
                            val existingTask = homeViewModel.getTaskById(taskId)
                            if (existingTask != null) {
                                val updatedTask = existingTask.copy(
                                    title = currentTitle,
                                    description = currentDescription
                                )
                                homeViewModel.updateTask(updatedTask)
                            }
                        }
                        navController.popBackStack()
                    }) {
                        Icon(
                            imageVector = Icons.Filled.Done,
                            contentDescription = "Save Task"
                        )
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp)
        ) {
            OutlinedTextField(
                value = taskTitle,
                onValueChange = { taskViewModel.onTaskTitleChange(it) },
                label = { Text("Title") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )
            Spacer(modifier = Modifier.height(16.dp))
            OutlinedTextField(
                value = taskDescription,
                onValueChange = { taskViewModel.onTaskDescriptionChange(it) },
                label = { Text("Description") },
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
            )
        }
    }
}
