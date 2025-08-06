package com.francids.productiva.data.models

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable
import kotlin.time.Clock
import kotlin.time.ExperimentalTime
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@Entity(tableName = "notes")
@Serializable
data class Note @OptIn(ExperimentalUuidApi::class, ExperimentalTime::class) constructor(
    @PrimaryKey() val id: String = Uuid.random().toString(),
    val title: String = "",
    val content: String = "",
    @ColumnInfo(name = "created_at") val createdAt: String = Clock.System.now().toString(),
    @ColumnInfo(name = "updated_at") val updatedAt: String = Clock.System.now().toString(),
)
