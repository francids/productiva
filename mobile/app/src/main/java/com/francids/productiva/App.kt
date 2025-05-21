package com.francids.productiva

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.francids.productiva.ui.screens.HomeScreen
import com.francids.productiva.ui.screens.NoteScreen
import com.francids.productiva.viewmodel.HomeViewModel
import com.francids.productiva.viewmodel.NoteViewModel

@Composable
fun MyApp() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            val homeViewModel: HomeViewModel = viewModel()
            HomeScreen(
                navController = navController,
                viewModel = homeViewModel,
            )
        }
        composable("notes/{noteId}") { backStackEntry ->
            val itemId = backStackEntry.arguments?.getString("noteId")
            val noteViewModel: NoteViewModel = viewModel()
            NoteScreen(
                navController = navController,
                itemId = itemId,
                viewModel = noteViewModel,
            )
        }
    }
}
