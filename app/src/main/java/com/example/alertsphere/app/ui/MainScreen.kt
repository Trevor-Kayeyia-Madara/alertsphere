package com.example.alertsphere.app.ui

import androidx.compose.foundation.layout.*
//noinspection UsingMaterialAndMaterial3Libraries
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun MainScreen(userRole: String) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("AlertSphere") }) },
        content = { paddingValues -> // Accepts paddingValues
            Column(
                modifier = Modifier
                    .padding(paddingValues) // Apply padding
                    .padding(16.dp) // Additional padding
            ) {
                Text("Welcome to AlertSphere", fontSize = MaterialTheme.typography.h4.fontSize)

                when (userRole) {
                    "citizen" -> CitizenFeatures()
                    "law_enforcement" -> PoliceFeatures()
                    "admin" -> AdminFeatures()
                }
            }
        }
    )
}

@Composable
fun CitizenFeatures() {
    Button(onClick = { /* Navigate to Crime Reporting */ }) {
        Text("Report a Crime")
    }
}

@Composable
fun PoliceFeatures() {
    Button(onClick = { /* Navigate to View Reports */ }) {
        Text("View Crime Reports")
    }
}

@Composable
fun AdminFeatures() {
    Button(onClick = { /* Navigate to Manage Users */ }) {
        Text("Manage Users")
    }
}