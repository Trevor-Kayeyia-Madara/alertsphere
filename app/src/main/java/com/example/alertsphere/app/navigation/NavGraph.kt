package com.example.alertsphere.app.navigation

import androidx.compose.runtime.*
import androidx.navigation.compose.*
import com.example.alertsphere.app.repository.AuthRepository
import com.example.alertsphere.app.ui.LoginScreen
import com.example.alertsphere.app.ui.MainScreen

@Composable
fun AppNavGraph(authRepository: AuthRepository) {
    val navController = rememberNavController()
    var userRole by remember { mutableStateOf("citizen") }

    NavHost(navController, startDestination = "login") {
        composable("login") {
            LoginScreen(authRepository) { role ->
                userRole = role
                navController.navigate("main")
            }
        }
        composable("main") { MainScreen(userRole) }
    }
}
