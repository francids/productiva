package com.francids.productiva.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.rounded.Add
import androidx.compose.material.icons.rounded.Circle
import androidx.compose.material.icons.rounded.MoreVert
import androidx.compose.material.icons.rounded.Pentagon
import androidx.compose.material.icons.rounded.Square
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.FilledTonalIconButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.PrimaryScrollableTabRow
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SplitButtonDefaults
import androidx.compose.material3.SplitButtonLayout
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.minimumInteractiveComponentSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.francids.productiva.ui.screens.tabs.ListsTabView
import com.francids.productiva.ui.screens.tabs.NotesTabView
import com.francids.productiva.ui.screens.tabs.TasksTabView
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class, ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun HomeScreen(
    navController: NavController,
    viewModel: HomeViewModel,
) {
    val tabs = listOf(
        Triple(Icons.Rounded.Circle, "Notes", "note"),
        Triple(Icons.Rounded.Pentagon, "Tasks", "task"),
        Triple(Icons.Rounded.Square, "Lists", "list")
    )
    val pagerState = rememberPagerState(pageCount = { tabs.size })
    val coroutineScope = rememberCoroutineScope()

    var checked by remember { mutableStateOf(false) }

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
                    FilledTonalIconButton(
                        onClick = {},
                        colors = IconButtonDefaults.iconButtonColors(
                            contentColor = MaterialTheme.colorScheme.onSurface,
                        ),
                        modifier = Modifier
                            .minimumInteractiveComponentSize()
                            .size(
                                size = IconButtonDefaults.smallContainerSize(
                                    widthOption = IconButtonDefaults.IconButtonWidthOption.Narrow,
                                )
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
        bottomBar = {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(148.dp)
                    .wrapContentSize(Alignment.Center)
                    .padding(horizontal = 16.dp)
                    .padding(bottom = 16.dp),
            ) {
                SplitButtonLayout(
                    leadingButton = {
                        SplitButtonDefaults.LeadingButton(
                            onClick = { },
                            modifier = Modifier.heightIn(SplitButtonDefaults.MediumContainerHeight),
                            contentPadding = SplitButtonDefaults.MediumLeadingButtonContentPadding,
                        ) {
                            Icon(
                                Icons.Rounded.Add,
                                modifier = Modifier.size(SplitButtonDefaults.LeadingIconSize),
                                contentDescription = "Add " + tabs[pagerState.currentPage].third,
                            )
                            Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                            Text("Add " + tabs[pagerState.currentPage].third)
                        }
                    },
                    trailingButton = {
                        Box(modifier = Modifier.wrapContentSize(Alignment.TopEnd)) {
                            SplitButtonDefaults.TrailingButton(
                                checked = checked,
                                onCheckedChange = { checked = it },
                                modifier = Modifier
                                    .heightIn(SplitButtonDefaults.MediumContainerHeight)
                                    .semantics {
                                        stateDescription = if (checked) "Expanded" else "Collapsed"
                                        contentDescription = "Toggle Button"
                                    },
                                contentPadding = SplitButtonDefaults.MediumLeadingButtonContentPadding,
                            ) {
                                val rotation: Float by animateFloatAsState(
                                    targetValue = if (checked) 180f else 0f,
                                    label = "Trailing Icon Rotation",
                                )
                                Icon(
                                    Icons.Filled.KeyboardArrowDown,
                                    modifier = Modifier
                                        .size(SplitButtonDefaults.TrailingIconSize)
                                        .graphicsLayer {
                                            this.rotationZ = rotation
                                        },
                                    contentDescription = "Localized description",
                                )
                            }
                            DropdownMenu(
                                expanded = checked,
                                onDismissRequest = { checked = false },
                            ) {
                                val otherTabs =
                                    tabs.filter { it.second != tabs[pagerState.currentPage].second }
                                val otherValues = otherTabs.map { it.third }

                                otherValues.forEachIndexed { index, value ->
                                    DropdownMenuItem(
                                        leadingIcon = {
                                            Icon(
                                                Icons.Rounded.Add,
                                                contentDescription = "Add $value",
                                            )
                                        },
                                        text = { Text("Add $value") },
                                        onClick = { },
                                    )
                                }
                            }
                        }
                    },
                )
            }
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
                    0 -> NotesTabView(navController)
                    1 -> TasksTabView()
                    2 -> ListsTabView()
                }
            }
        }
    }
}
