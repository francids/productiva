package com.francids.productiva

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.francids.productiva.ui.screens.HomeScreen
import com.francids.productiva.ui.screens.HomeViewModel
import com.francids.productiva.ui.screens.NoteScreen
import com.francids.productiva.ui.screens.NoteViewModel
import com.francids.productiva.ui.screens.TaskScreen
import com.francids.productiva.ui.screens.TaskViewModel

object Routes {
    const val APP_HOME = "home"
    const val APP_NOTES_DETAIL = "notes/{noteId}"
    const val APP_TASK_DETAIL = "task_screen?taskId={taskId}"

    // Argument names
    const val ARG_NOTE_ID = "noteId"
    const val ARG_TASK_ID = "taskId"
}

@Composable
fun MyApp() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Routes.APP_HOME) {
        composable(Routes.APP_HOME) {
            val homeViewModel: HomeViewModel = viewModel()
            HomeScreen(
                navController = navController,
                viewModel = homeViewModel
            )
        }

        composable(
            route = Routes.APP_NOTES_DETAIL,
            arguments = listOf(
                navArgument(Routes.ARG_NOTE_ID) {
                    type = NavType.StringType
                    nullable = false // Assuming noteId is required for this screen
                }
            )
        ) { backStackEntry ->
            val noteViewModel: NoteViewModel = viewModel()
            val noteId = backStackEntry.arguments?.getString(Routes.ARG_NOTE_ID)
            // NoteScreen does not use HomeViewModel currently, so it's not instantiated here.
            NoteScreen(
                navController = navController,
                itemId = noteId, // Renamed from itemId to noteId for clarity
                viewModel = noteViewModel
            )
        }

        composable(
            route = Routes.APP_TASK_DETAIL,
            arguments = listOf(
                navArgument(Routes.ARG_TASK_ID) {
                    type = NavType.StringType
                    nullable = true
                }
            )
        ) { backStackEntry ->
            val homeViewModel: HomeViewModel = viewModel() // TaskScreen uses HomeViewModel
            val taskViewModel: TaskViewModel = viewModel() // TaskScreen also uses TaskViewModel
            val taskId = backStackEntry.arguments?.getString(Routes.ARG_TASK_ID)
            TaskScreen(
                navController = navController,
                homeViewModel = homeViewModel,
                taskViewModel = taskViewModel,
                taskId = taskId
            )
        }
    }
}
