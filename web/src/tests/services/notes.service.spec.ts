import { DexieService } from "../../app/services/db.service";
import { NotesService } from "../../app/services/notes.service";
import { Note } from "../../app/models/note.model";
import { firstValueFrom } from "rxjs";

describe("NotesService", () => {
  let service: NotesService;
  let mockDexieService: jasmine.SpyObj<DexieService>;
  let mockDb: any;
  let mockNotes: Note[];

  beforeEach(async () => {
    mockNotes = [
      { id: "1", title: "Nota 1", content: "Contenido 1" },
      { id: "2", title: "Nota 2", content: "Contenido 2" }
    ];

    mockDb = {
      notes: {
        toArray: jasmine.createSpy("toArray").and.callFake(() => {
          return Promise.resolve([...mockNotes]);
        }),
        get: jasmine.createSpy("get").and.callFake((id: string) => {
          const note = mockNotes.find(n => n.id === id);
          return Promise.resolve(note);
        }),
        put: jasmine.createSpy("put").and.resolveTo(),
        update: jasmine.createSpy("update").and.resolveTo({}),
        delete: jasmine.createSpy("delete").and.resolveTo()
      }
    };

    mockDexieService = jasmine.createSpyObj("DexieService", [], { db: mockDb });

    service = new NotesService(mockDexieService);
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });

  it("should create the service", () => {
    expect(service).toBeTruthy();
  });

  it("should load notes on initialization", async () => {
    expect(mockDb.notes.toArray).toHaveBeenCalledTimes(1);

    const notes = await firstValueFrom(service.notes$);
    expect(notes.length).toBe(2);
    expect(notes[0]).toEqual(mockNotes[0]);
    expect(notes[1]).toEqual(mockNotes[1]);
  });

  it("should get note by id", async () => {
    const noteId = "1";
    const note = await service.getNoteById(noteId);

    expect(mockDb.notes.get).toHaveBeenCalledWith(noteId);
    expect(note).toEqual(mockNotes[0]);
  });

  it("should save a note and reload notes", async () => {
    const newNote: Note = {
      id: "3",
      title: "Nueva nota",
      content: "Nuevo contenido",
    };

    await service.saveNote(newNote);

    expect(mockDb.notes.put).toHaveBeenCalledWith(newNote);
    expect(mockDb.notes.toArray).toHaveBeenCalledTimes(2);
  });

  it("should update a note and reload notes", async () => {
    const noteId = "1";
    const updatedNote: Note = {
      id: "1",
      title: "Nota actualizada",
      content: "Contenido actualizado",
    };

    await service.updateNote(noteId, updatedNote);

    expect(mockDb.notes.update).toHaveBeenCalledWith(noteId, updatedNote);
    expect(mockDb.notes.toArray).toHaveBeenCalledTimes(2);
  });

  it("should delete a note and reload notes", async () => {
    const noteId = "2";

    await service.deleteNote(noteId);

    expect(mockDb.notes.delete).toHaveBeenCalledWith(noteId);
    expect(mockDb.notes.toArray).toHaveBeenCalledTimes(2);
  });
});
