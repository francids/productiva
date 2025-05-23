package com.francids.productiva.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.Notes
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.rounded.CheckCircleOutline
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.FloatingActionButtonMenu
import androidx.compose.material3.FloatingActionButtonMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.PrimaryScrollableTabRow
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.ToggleFloatingActionButton
import androidx.compose.material3.ToggleFloatingActionButtonDefaults.animateIcon
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.animateFloatingActionButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.dp
import androidx.compose.ui.zIndex
import androidx.navigation.NavController
import com.francids.productiva.ui.components.NoteCard
import com.francids.productiva.ui.components.TaskCard
import kotlinx.coroutines.launch

@OptIn(
    ExperimentalMaterial3Api::class,
    ExperimentalMaterial3ExpressiveApi::class,
)
@Composable
fun HomeScreen(
    navController: NavController,
    viewModel: HomeViewModel,
) {
    var fabMenuExpanded by rememberSaveable {
        mutableStateOf(false)
    }
    val listState = rememberLazyListState()
    val fabVisible by remember {
        derivedStateOf {
            listState.firstVisibleItemIndex == 0
        }
    }
    var tabs = listOf(
        Triple(Icons.AutoMirrored.Rounded.Notes, "Notes", "Note"),
        Triple(Icons.Rounded.CheckCircleOutline, "Tasks", "Task"),
    )
    val pagerState = rememberPagerState(pageCount = { tabs.size })
    val coroutineScope = rememberCoroutineScope()

    val notes by viewModel.notes.collectAsState()
    val tasks by viewModel.tasks.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .fillMaxWidth(),
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text(
                            text = "Productiva シ",
                            style = MaterialTheme.typography.titleLarge,
                        )
                    },
                )
            },
        ) { innerPadding ->
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = innerPadding.calculateTopPadding())
            ) {
                PrimaryScrollableTabRow(
                    selectedTabIndex = pagerState.currentPage,
                    modifier = Modifier.fillMaxWidth(),
                    edgePadding = 0.dp,
                    divider = { },
                ) {
                    tabs.forEachIndexed { index, tab ->
                        Tab(
                            selected = pagerState.currentPage == index,
                            onClick = {
                                coroutineScope.launch {
                                    pagerState.animateScrollToPage(index)
                                }
                            },
                            text = {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.Center
                                ) {
                                    Icon(
                                        imageVector = tab.first,
                                        contentDescription = null,
                                    )
                                    Spacer(Modifier.width(8.dp))
                                    Text(
                                        text = tab.second,
                                        style = MaterialTheme.typography.labelLarge,
                                        color = MaterialTheme.colorScheme.onSurface,
                                    )
                                }
                            },
                            modifier = Modifier
                                .padding(4.dp)
                                .clip(RoundedCornerShape(percent = 25)),
                        )
                    }
                }

                HorizontalDivider(
                    modifier = Modifier.fillMaxWidth(),
                    thickness = 1.dp,
                    color = MaterialTheme.colorScheme.primaryContainer.copy(
                        alpha = 0.5f,
                    ),
                )

                HorizontalPager(
                    state = pagerState,
                    modifier = Modifier.fillMaxWidth(),
                ) { page ->
                    when (page) {
                        0 -> {
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
                                        notes[index],
                                        isFirstNote = index == 0,
                                        isLastNote = index == notes.size - 1,
                                        onClick = {
                                            navController.navigate("notes/${notes[index].id}")
                                        },
                                    )
                                }
                            }
                        }

                        1 -> {
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
                                    val task = tasks[index]
                                    TaskCard(
                                        task = task,
                                        onClick = { navController.navigate("task_screen?taskId=${task.id}") },
                                        onCheckedChange = { homeViewModel.toggleTaskCompleted(task.id) }
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        AnimatedVisibility(
            visible = fabMenuExpanded,
            enter = fadeIn(),
            exit = fadeOut(),
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = 0.4f))
                .pointerInput(Unit) {
                    detectTapGestures {
                        fabMenuExpanded = false
                    }
                }
                .zIndex(1f),
        ) {}

        FloatingActionButtonMenu(
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .safeDrawingPadding()
                .zIndex(2f),
            expanded = fabMenuExpanded,
            button = {
                ToggleFloatingActionButton(
                    modifier = Modifier.animateFloatingActionButton(
                        visible = fabVisible || fabMenuExpanded,
                        alignment = Alignment.BottomEnd,
                    ),
                    checked = fabMenuExpanded,
                    onCheckedChange = { fabMenuExpanded = !fabMenuExpanded },
                ) {
                    val imageVector by remember {
                        derivedStateOf {
                            if (checkedProgress > 0.5f) Icons.Filled.Close
                            else Icons.Filled.Add
                        }
                    }
                    Icon(
                        painter = rememberVectorPainter(imageVector),
                        contentDescription = null,
                        modifier = Modifier.animateIcon({ checkedProgress })
                    )
                }
            },
        ) {
            tabs.forEachIndexed { i, item ->
                FloatingActionButtonMenuItem(
                    onClick = {
                        if (item.third == "Task") {
                            navController.navigate("task_screen")
                        } else if (item.third == "Note") {
                            // Future: Potentially navigate to a new note screen or handle differently
                            // navController.navigate("new_note_screen")
                        }
                        fabMenuExpanded = false
                    },
                    icon = { Icon(item.first, contentDescription = null) },
                    text = { Text(text = item.third) },
                )
            }
        }
    }
}
