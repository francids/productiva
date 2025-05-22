package com.francids.productiva.ui.screens

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.MediumTopAppBar
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberTopAppBarState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.francids.productiva.viewmodel.NoteViewModel

@OptIn(ExperimentalMaterial3Api::class, ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun NoteScreen(
    navController: NavController,
    itemId: String?,
    viewModel: NoteViewModel = viewModel(),
) {
    val noteContent by viewModel.noteContent.collectAsState()
    val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior(rememberTopAppBarState())
    var placeholders: List<String> = listOf(
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
    )
    val currentPlaceholder = remember { placeholders.asSequence().shuffled().first() }

    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            MediumTopAppBar(
                title = {
                    Text(
                        text = if (itemId != null) "Note $itemId" else "New Note",
                        style = MaterialTheme.typography.titleMedium,
                    )
                },
                navigationIcon = {
                    IconButton(
                        onClick = {
                            navController.popBackStack()
                        },
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Rounded.ArrowBack,
                            contentDescription = null,
                        )
                    }
                },
                scrollBehavior = scrollBehavior,
            )
        },
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(
                    top = if (scrollBehavior.state.collapsedFraction > 0.5f) 16.dp else 8.dp,
                    start = 16.dp,
                    end = 16.dp,
                ),
            contentPadding = PaddingValues(
                top = innerPadding.calculateTopPadding(),
                bottom = 16.dp,
            ),
        ) {
            item {
                BasicTextField(
                    value = noteContent,
                    onValueChange = { newValue ->
                        viewModel.updateNoteContent(newValue)
                    },
                    modifier = Modifier
                        .fillMaxSize()
                        .fillParentMaxHeight(),
                    textStyle = MaterialTheme.typography.bodyLargeEmphasized.copy(
                        color = MaterialTheme.colorScheme.onSurface,
                    ),
                    singleLine = false,
                    cursorBrush = SolidColor(MaterialTheme.colorScheme.primary),
                    decorationBox = { innerTextField ->
                        if (noteContent.text.isEmpty()) {
                            Text(
                                text = currentPlaceholder,
                                style = MaterialTheme.typography.bodyLargeEmphasized,
                                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(
                                    alpha = 0.5f,
                                ),
                            )
                        }
                        innerTextField()
                    },
                )
            }
        }
    }
}
