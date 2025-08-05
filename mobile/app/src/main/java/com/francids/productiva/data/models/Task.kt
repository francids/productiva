package com.francids.productiva.data.models

import kotlinx.serialization.Serializable
import kotlin.time.Clock
import kotlin.time.ExperimentalTime
import kotlin.time.Instant
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
@Serializable
data class Task @OptIn(ExperimentalTime::class) constructor(
    val id: String = Uuid.random().toString(),
    val title: String,
    val description: String = "",
    val isCompleted: Boolean = false,
    val createdAt: Instant = Clock.System.now(),
    val updatedAt: Instant = Clock.System.now()
)
