import { DexieService } from "../../app/services/db.service";

describe("DexieService", () => {
  let service: DexieService;
  beforeEach(() => {
    service = new DexieService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the database', async () => {
    spyOn(service.db, 'open').and.resolveTo();
    spyOn(console, 'log');

    await service.init();

    expect(service.db.open).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Database initialized');
  });

  it('should handle database initialization errors', async () => {
    const error = new Error('Test error');
    spyOn(service.db, 'open').and.rejectWith(error);
    spyOn(console, 'error');

    await service.init();

    expect(console.error).toHaveBeenCalledWith('Failed to open database:', error);
  });

  it('should have notes and tasks tables defined', () => {
    expect(service.db.notes).toBeDefined();
    expect(service.db.tasks).toBeDefined();
  });
});
