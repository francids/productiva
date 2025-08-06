package com.francids.productiva.ui.screens.tabs

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.ContainedLoadingIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.material3.pulltorefresh.rememberPullToRefreshState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController
import com.francids.productiva.ui.components.NoteCard
import com.francids.productiva.ui.components.NoteFolder
import com.francids.productiva.ui.components.NoteFolderCard
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.time.ExperimentalTime

@OptIn(
    ExperimentalMaterial3Api::class,
    ExperimentalTime::class,
    ExperimentalMaterial3ExpressiveApi::class
)
@Composable
fun NotesTabView(
    navController: NavController,
    viewModel: NotesTabViewModel,
) {
    val notes by viewModel.notes.collectAsStateWithLifecycle()
    val noteFolders = listOf(
        NoteFolder("0", "Something folder", 5),
        NoteFolder("1", "Interesting", 12),
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
            if (isRefreshing) @OptIn(ExperimentalMaterial3ExpressiveApi::class) ContainedLoadingIndicator(
                modifier = Modifier
                    .align(Alignment.TopCenter)
                    .padding(top = 16.dp),
            )
        },
    ) {
        if (notes.isEmpty() && noteFolders.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No notes. Pull to refresh or create one.",
                    style = MaterialTheme.typography.bodyMediumEmphasized,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center,
                )
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(
                        start = 16.dp,
                        end = 16.dp,
                    ),
                contentPadding = PaddingValues(
                    top = 16.dp,
                    bottom = 136.dp,
                ),
            ) {
                if (noteFolders.isNotEmpty()) {
                    item {
                        Text(
                            text = "Folders",
                            style = MaterialTheme.typography.titleMediumEmphasized,
                            modifier = Modifier.padding(top = 8.dp, bottom = 16.dp),
                        )
                    }
                }

                items(noteFolders.size) { index ->
                    NoteFolderCard(
                        noteFolder = noteFolders[index],
                        isFirstNote = index == 0,
                        isLastNote = index == noteFolders.size - 1,
                        onClick = { },
                    )
                }

                if (notes.isNotEmpty()) {
                    item {
                        Text(
                            text = "Notes",
                            style = MaterialTheme.typography.titleMediumEmphasized,
                            modifier = Modifier.padding(top = 24.dp, bottom = 16.dp),
                        )
                    }
                }

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
}
