package com.francids.productiva.ui.screens.tabs

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.ContainedLoadingIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.material3.pulltorefresh.rememberPullToRefreshState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.francids.productiva.data.models.Task
import com.francids.productiva.ui.components.TaskCard
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class, ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun TasksTabView() {
    val tasks = listOf(
        Task(
            title = "Grocery Shopping",
            description = "Buy groceries for the week: milk, eggs, bread, chicken, and vegetables."
        ), Task(
            title = "Complete Project Proposal",
            description = "Finish writing the project proposal and send it for review by Friday."
        ), Task(
            title = "Book Doctor's Appointment"
        )
    )

    var isRefreshing by remember { mutableStateOf(false) }
    val pullToRefreshState = rememberPullToRefreshState()

    PullToRefreshBox(
        isRefreshing = isRefreshing,
        onRefresh = {
            isRefreshing = true
            CoroutineScope(Dispatchers.IO).launch {
                delay(2000)
                isRefreshing = false
            }
        },
        state = pullToRefreshState,
        indicator = {
            if (isRefreshing) ContainedLoadingIndicator(
                modifier = Modifier
                    .align(Alignment.TopCenter)
                    .padding(top = 16.dp),
            )
        },
    ) {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(
                    start = 16.dp,
                    end = 16.dp,
                ),
            contentPadding = PaddingValues(
                top = 16.dp,
                bottom = 16.dp,
            ),
        ) {
            items(tasks.size) { index ->
                TaskCard(
                    task = tasks[index],
                    isFirstTask = index == 0,
                    isLastTask = index == tasks.size - 1,
                    onClick = { },
                    onCheckedChange = { },
                )
            }
        }
    }
}
