package com.example.alertsphere

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.example.alertsphere.app.navigation.AppNavGraph
import com.example.alertsphere.app.repository.AuthRepository

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val authRepository = AuthRepository()

        setContent {
            AppNavGraph(authRepository)
        }
    }
}