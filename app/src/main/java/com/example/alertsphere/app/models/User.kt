package com.example.alertsphere.app.models

data class User(
    val uid: String = "",
    val email: String = "",
    val role: String = "citizen" // Default role: citizen
)