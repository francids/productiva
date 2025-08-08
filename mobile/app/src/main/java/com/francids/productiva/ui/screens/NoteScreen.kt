package com.francids.productiva.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.rounded.MoreVert
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.FilledTonalIconButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.minimumInteractiveComponentSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController

@Composable
fun NoteScreen(
    navController: NavController,
    viewModel: NoteViewModel = viewModel(),
) {
    val focusRequester = remember { FocusRequester() }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.surfaceContainerLowest,
        topBar = {
            NoteTopAppBar(
                navController = navController,
                viewModel = viewModel,
            )
        },
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = innerPadding.calculateTopPadding())
                .background(MaterialTheme.colorScheme.surface)
        ) {
            val scrollState = rememberScrollState()
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(scrollState)
                    .weight(1f)
                    .imePadding(),
            ) {
                NoteTitleField(
                    viewModel = viewModel,
                    focusRequester = focusRequester,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                )
                NoteContentField(
                    viewModel = viewModel,
                    modifier = Modifier.fillMaxSize(),
                )
            }
        }
    }

    LaunchedEffect(Unit) {
        if (viewModel.newTitle.isEmpty()) {
            focusRequester.requestFocus()
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class, ExperimentalMaterial3ExpressiveApi::class)
@Composable
private fun NoteTopAppBar(
    navController: NavController,
    viewModel: NoteViewModel,
) {
    var showMenu by remember { mutableStateOf(false) }
    Column {
        CenterAlignedTopAppBar(
            title = {
                Text(
                    text = viewModel.noteInfo.value,
                    style = MaterialTheme.typography.labelLargeEmphasized,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.graphicsLayer(alpha = 0.25f)
                )
            },
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = Color.Transparent,
                scrolledContainerColor = Color.Transparent,
                navigationIconContentColor = MaterialTheme.colorScheme.onSurface,
                titleContentColor = MaterialTheme.colorScheme.onSurface,
                actionIconContentColor = MaterialTheme.colorScheme.onSurface,
            ),
            navigationIcon = {
                FilledTonalIconButton(
                    onClick = { navController.popBackStack() },
                    colors = IconButtonDefaults.filledTonalIconButtonColors(
                        containerColor = MaterialTheme.colorScheme.surfaceContainerLow,
                        contentColor = MaterialTheme.colorScheme.onSurface,
                    ),
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Rounded.ArrowBack,
                        contentDescription = "Back",
                    )
                }
            },
            actions = {
                Box {
                    FilledTonalIconButton(
                        onClick = { showMenu = !showMenu },
                        colors = IconButtonDefaults.iconButtonColors(
                            contentColor = MaterialTheme.colorScheme.onSurface,
                        ),
                        modifier = Modifier
                            .minimumInteractiveComponentSize()
                            .size(
                                size = IconButtonDefaults.smallContainerSize(
                                    widthOption = IconButtonDefaults.IconButtonWidthOption.Narrow,
                                ),
                            ),
                    ) {
                        Icon(
                            imageVector = Icons.Rounded.MoreVert,
                            contentDescription = "More options",
                        )
                    }
                    DropdownMenu(
                        expanded = showMenu,
                        onDismissRequest = { showMenu = false },
                    ) {
                        DropdownMenuItem(
                            text = {
                                Text(text = "Delete")
                            },
                            onClick = {
                                showMenu = false
                                viewModel.deleteNote()
                                navController.popBackStack()
                            },
                        )
                    }
                }
            },
        )
        HorizontalDivider()
    }
}

@Composable
private fun NoteTitleField(
    viewModel: NoteViewModel,
    focusRequester: FocusRequester,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier.padding(
            top = 16.dp,
            bottom = 16.dp,
        ),
        contentAlignment = Alignment.CenterStart,
    ) {
        BasicTextField(
            value = viewModel.newTitle,
            onValueChange = { viewModel.onTitleChange(newText = it) },
            textStyle = MaterialTheme.typography.titleLarge.copy(
                color = MaterialTheme.colorScheme.onSurface
            ),
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Text,
                imeAction = ImeAction.Next,
            ),
            cursorBrush = SolidColor(
                value = MaterialTheme.colorScheme.primary,
            ),
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(focusRequester),
            decorationBox = { innerTextField ->
                if (viewModel.newTitle.isEmpty()) {
                    Text(
                        text = "Untitled",
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                        overflow = TextOverflow.Clip,
                    )
                }
                innerTextField()
            },
        )
    }
}

@Composable
private fun NoteContentField(
    viewModel: NoteViewModel,
    modifier: Modifier = Modifier,
) {
    val placeholder = remember {
        listOf(
            "Write your note here...",
            "What do you have in mind today?",
            "Start writing...",
            "Put your ideas here...",
            "Take a quick note...",
            "Write your thoughts...",
            "Reflect on your day...",
            "Capture your creativity...",
            "Write something great...",
            "Let your imagination fly...",
            "Start your journey...",
            "Let your imagination soar..."
        ).shuffled().first()
    }

    Column(
        modifier = modifier.padding(horizontal = 16.dp),
    ) {
        BasicTextField(
            value = viewModel.newContent,
            onValueChange = { viewModel.onContentChange(newText = it) },
            textStyle = MaterialTheme.typography.bodyLarge.copy(
                color = MaterialTheme.colorScheme.onSurface,
                lineHeight = 28.sp,
            ),
            cursorBrush = SolidColor(MaterialTheme.colorScheme.primary),
            decorationBox = { innerTextField ->
                if (viewModel.newContent.isEmpty()) {
                    Text(
                        text = placeholder,
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f),
                        lineHeight = 28.sp,
                    )
                }
                innerTextField()
            },
        )

        Box(
            modifier = Modifier.height(64.dp),
        )
    }
}
