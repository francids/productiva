package com.francids.productiva.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Add
import androidx.compose.material.icons.rounded.Circle
import androidx.compose.material.icons.rounded.MoreVert
import androidx.compose.material.icons.rounded.Pentagon
import androidx.compose.material.icons.rounded.Square
import androidx.compose.material3.ContainedLoadingIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.FloatingActionButtonMenu
import androidx.compose.material3.FloatingActionButtonMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.IconButtonDefaults.smallContainerSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.PrimaryScrollableTabRow
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.ToggleFloatingActionButton
import androidx.compose.material3.ToggleFloatingActionButtonDefaults.animateIcon
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.animateFloatingActionButton
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.material3.pulltorefresh.rememberPullToRefreshState
import androidx.compose.material3.rememberModalBottomSheetState
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
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.compose.ui.unit.dp
import androidx.compose.ui.zIndex
import androidx.navigation.NavController
import com.francids.productiva.ui.components.NoteCard
import com.francids.productiva.ui.components.TaskCard
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
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
    val tabs = listOf(
        Triple(Icons.Rounded.Circle, "Notes", "Note"),
        Triple(Icons.Rounded.Pentagon, "Tasks", "Task"),
        Triple(Icons.Rounded.Square, "Lists", "List")
    )
    val pagerState = rememberPagerState(pageCount = { tabs.size })
    val coroutineScope = rememberCoroutineScope()

    val notes by viewModel.notes.collectAsState()
    val tasks by viewModel.tasks.collectAsState()

    val taskSheetState = rememberModalBottomSheetState()
    val scope = rememberCoroutineScope()
    var showTaskSheet by remember { mutableStateOf(false) }
    var selectedTaskId by remember { mutableStateOf<String?>(null) }

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
                    actions = {
                        IconButton(
                            onClick = { },
                            modifier = Modifier.size(
                                smallContainerSize(
                                    IconButtonDefaults.IconButtonWidthOption.Narrow,
                                ),
                            ),
                        ) {
                            Icon(
                                imageVector = Icons.Rounded.MoreVert,
                                contentDescription = "More options",
                            )
                        }
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
                    tabs = {
                        tabs.forEachIndexed { index, tab ->
                            Tab(
                                selected = pagerState.currentPage == index,
                                onClick = {
                                    coroutineScope.launch {
                                        pagerState.animateScrollToPage(index)
                                    }
                                },
                                text = {
                                    Text(
                                        text = tab.second,
                                        style = MaterialTheme.typography.labelLarge,
                                        modifier = Modifier.padding(8.dp),
                                    )
                                },
                            )
                        }
                    },
                )

                HorizontalPager(
                    state = pagerState,
                    modifier = Modifier.fillMaxWidth(),
                ) { page ->
                    when (page) {
                        0 -> {
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
                                    TaskCard(
                                        task = tasks[index],
                                        isFirstTask = index == 0,
                                        isLastTask = index == tasks.size - 1,
                                        onClick = {
                                            showTaskSheet = true
                                            selectedTaskId = tasks[index].id
                                            scope.launch { taskSheetState.show() }
                                        },
                                        onCheckedChange = {
                                            viewModel.toggleTaskCompleted(tasks[index].id)
                                        },
                                    )
                                }
                            }
                        }

                        2 -> {
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
                            ) {}
                        }
                    }
                }
            }
        }

        AnimatedVisibility(
            visible = fabMenuExpanded,
            enter = fadeIn(animationSpec = tween(300)),
            exit = fadeOut(animationSpec = tween(300)),
            modifier = Modifier
                .fillMaxSize()
                .zIndex(1f)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        MaterialTheme.colorScheme.surfaceContainer.copy(
                            alpha = 0.8f,
                        )
                    )
                    .clickable(
                        interactionSource = remember { MutableInteractionSource() },
                        indication = null
                    ) {
                        fabMenuExpanded = false
                    },
            )
        }

        if (showTaskSheet) {
            ModalBottomSheet(
                onDismissRequest = {
                    showTaskSheet = false
                },
                sheetState = taskSheetState,
            ) {
                TaskSheet(
                    homeViewModel = viewModel, taskId = selectedTaskId, onDismiss = {
                        scope.launch { taskSheetState.hide() }.invokeOnCompletion {
                            if (!taskSheetState.isVisible) {
                                showTaskSheet = false
                            }
                        }
                    })
            }
        }

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
                    Icon(
                        painter = rememberVectorPainter(Icons.Rounded.Add),
                        contentDescription = null,
                        modifier = Modifier
                            .animateIcon({ checkedProgress })
                            .rotate(checkedProgress * 45f)
                    )
                }
            },
        ) {
            tabs.forEachIndexed { _, item ->
                FloatingActionButtonMenuItem(
                    onClick = {
                        fabMenuExpanded = false
                    },
                    icon = {
                        Icon(
                            item.first,
                            contentDescription = null,
                            modifier = Modifier.size(MaterialTheme.typography.labelLarge.fontSize.value.dp),
                        )
                    },
                    text = {
                        Text(
                            text = item.third,
                            style = MaterialTheme.typography.labelLarge,
                        )
                    },
                )
            }
        }
    }
}
