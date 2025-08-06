package com.francids.productiva.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.francids.productiva.data.models.Note

@Database(
    entities = [
        Note::class,
    ],
    version = 1,
    exportSchema = true,
)
abstract class PrincipalDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao

    companion object {
        @Volatile
        private var INSTANCE: PrincipalDatabase? = null

        fun getDatabase(context: Context): PrincipalDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    klass = PrincipalDatabase::class.java,
                    name = "principal_database",
                ).allowMainThreadQueries().fallbackToDestructiveMigration(dropAllTables = false)
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
