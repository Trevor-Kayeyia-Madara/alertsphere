package com.example.alertsphere.app.ui

import android.widget.Toast
import androidx.compose.foundation.layout.*
//noinspection UsingMaterialAndMaterial3Libraries
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.example.alertsphere.app.repository.AuthRepository
import com.google.firebase.auth.FirebaseAuth

@Composable
fun LoginScreen(authRepository: AuthRepository, onLoginSuccess: (String) -> Unit) {
    val context = LocalContext.current
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var loginError by remember { mutableStateOf(false) }

    Column(modifier = Modifier.padding(16.dp)) {
        Text("Login", fontSize = MaterialTheme.typography.h5.fontSize)

        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth()
        )

        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                authRepository.loginUser(email, password) { success ->
                    if (success) {
                        val uid = FirebaseAuth.getInstance().currentUser?.uid ?: return@loginUser
                        authRepository.getCurrentUserRole(uid) { role -> onLoginSuccess(role) }
                    } else {
                        loginError = true
                    }
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Login")
        }

        if (loginError) {
            Toast.makeText(context, "Login failed. Try again.", Toast.LENGTH_SHORT).show()
        }
    }
}