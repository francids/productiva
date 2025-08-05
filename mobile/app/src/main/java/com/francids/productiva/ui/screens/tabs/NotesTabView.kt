package com.francids.productiva.ui.screens.tabs

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
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
import androidx.compose.ui.tooling.preview.datasource.LoremIpsum
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.francids.productiva.data.models.Note
import com.francids.productiva.ui.components.NoteCard
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.time.ExperimentalTime

@OptIn(ExperimentalMaterial3Api::class, ExperimentalTime::class)
@Composable
fun NotesTabView(
    navController: NavController,
) {
    val notes = listOf(
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
    val listState = rememberLazyListState()
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
            if (isRefreshing) @OptIn(ExperimentalMaterial3ExpressiveApi::class) ContainedLoadingIndicator(
                modifier = Modifier
                    .align(Alignment.TopCenter)
                    .padding(top = 16.dp),
            )
        },
    ) {
        LazyColumn(
            state = listState,
            modifier = Modifier
                .fillMaxSize()
                .padding(
                    start = 16.dp,
                    end = 16.dp,
                ),
            contentPadding = PaddingValues(
                top = 16.dp,
                bottom = 32.dp,
            ),
        ) {
            items(notes.size) { index ->
                NoteCard(
                    note = notes[index],
                    isFirstNote = index == 0,
                    isLastNote = index == notes.size - 1,
                    onClick = {
                        navController.navigate("notes/${notes[index].id}")
                    },
                )
            }
        }
    }
}