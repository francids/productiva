package com.francids.productiva

import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.core.tween
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExperimentalMaterial3ExpressiveApi
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.francids.productiva.ui.screens.HomeScreen
import com.francids.productiva.ui.screens.HomeViewModel
import com.francids.productiva.ui.screens.HomeViewModelFactory
import com.francids.productiva.ui.screens.NoteScreen
import com.francids.productiva.ui.screens.NoteViewModel
import com.francids.productiva.ui.screens.NoteViewModelFactory
import com.francids.productiva.ui.screens.tabs.NotesTabViewModel
import com.francids.productiva.ui.screens.tabs.NotesTabViewModelFactory

@OptIn(ExperimentalMaterial3Api::class, ExperimentalMaterial3ExpressiveApi::class)
@Composable
fun MyApp() {
    val context = LocalContext.current
    val navController = rememberNavController()
    val noteRepository = remember { ServiceLocator.provideNoteRepository(context) }

    NavHost(
        navController = navController,
        startDestination = Routes.APP_HOME,
    ) {
        composable(
            route = Routes.APP_HOME,
        ) {
            val homeViewModel: HomeViewModel = viewModel(
                factory = HomeViewModelFactory(
                    noteRepository = noteRepository,
                )
            )
            val noteTabViewModel: NotesTabViewModel = viewModel(
                factory = NotesTabViewModelFactory(noteRepository),
            )
            HomeScreen(
                navController = navController,
                viewModel = homeViewModel,
                noteTabViewModel = noteTabViewModel,
            )
        }

        composable(
            route = Routes.APP_NOTES_DETAIL,
            arguments = listOf(
                navArgument(Routes.ARG_NOTE_ID) {
                    type = NavType.StringType
                    nullable = false
                },
            ),
            enterTransition = {
                slideIntoContainer(
                    AnimatedContentTransitionScope.SlideDirection.Start,
                    animationSpec = tween(350),
                )
            },
            exitTransition = {
                slideOutOfContainer(
                    AnimatedContentTransitionScope.SlideDirection.End,
                    animationSpec = tween(350),
                )
            },
            popEnterTransition = {
                slideIntoContainer(
                    AnimatedContentTransitionScope.SlideDirection.Start,
                    animationSpec = tween(350),
                )
            },
            popExitTransition = {
                slideOutOfContainer(
                    AnimatedContentTransitionScope.SlideDirection.End,
                    animationSpec = tween(350),
                )
            },
        ) { backStackEntry ->
            val noteId = backStackEntry.arguments?.getString(Routes.ARG_NOTE_ID)
            val noteViewModel: NoteViewModel = viewModel(
                factory = NoteViewModelFactory(
                    repository = noteRepository,
                    noteId = noteId ?: "",
                )
            )
            NoteScreen(
                navController = navController,
                viewModel = noteViewModel,
            )
        }
    }
}
