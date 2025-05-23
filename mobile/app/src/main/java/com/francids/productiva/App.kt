package com.francids.productiva

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.francids.productiva.ui.screens.HomeScreen
import com.francids.productiva.ui.screens.HomeViewModel
import com.francids.productiva.ui.screens.NoteScreen
import com.francids.productiva.ui.screens.NoteViewModel

object Routes {
    const val APP_HOME = "home"
    const val APP_NOTES_DETAIL = "notes/{noteId}"
    const val ARG_NOTE_ID = "noteId"
}

@Composable
fun MyApp() {
    val navController = rememberNavController()
    NavHost(
        navController = navController,
        startDestination = Routes.APP_HOME,
    ) {
        composable(
            route = Routes.APP_HOME,
        ) {
            val homeViewModel: HomeViewModel = viewModel()
            HomeScreen(
                navController = navController, viewModel = homeViewModel
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
        ) { backStackEntry ->
            val noteViewModel: NoteViewModel = viewModel()
            val noteId = backStackEntry.arguments?.getString(Routes.ARG_NOTE_ID)
            NoteScreen(
                navController = navController,
                itemId = noteId,
                viewModel = noteViewModel,
            )
        }
    }
}
