import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  // Mock data yang akan dikembalikan oleh service palsu
  const mockStudent = {
    _id: '60c72b2f9b1d8b2bad72715a',
    name: 'John Doe',
    email: 'john@example.com',
  };

  // Membuat tiruan fungsi (mock) dari StudentsService
  const mockStudentsService = {
    create: jest.fn().mockResolvedValue(mockStudent),
    findAll: jest.fn().mockResolvedValue([mockStudent]),
    findOne: jest.fn().mockResolvedValue(mockStudent),
    update: jest.fn().mockResolvedValue(mockStudent),
    remove: jest.fn().mockResolvedValue(mockStudent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: mockStudentsService, // Menimpa service asli dengan objek mock kita
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ==========================================
  // TEST CASES UNTUK SETIAP ROUTE CONTROLLER
  // ==========================================

  describe('create', () => {
    it('should call service.create with dto and return the result', async () => {
      const dto: CreateStudentDto = {
        nim: '23.11.5001',
        name: 'Ahmad Santoso',
        email: 'ahmad@student.amikom.ac.id',
        class: 'IF-A',
        year: 2023,
        gpa: 3.75,
        status: 'active',
      };

      // 1. Ambil kendali fungsi lewat spyOn terlebih dahulu
      const createSpy = jest.spyOn(service, 'create');

      const result = await controller.create(dto);

      // 2. Lakukan pengecekan pada variabel spy tersebut
      expect(createSpy).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return an array of students', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const result = await controller.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual([mockStudent]);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct ID', async () => {
      const id = '60c72b2f9b1d8b2bad72715a';
      const findOneSpy = jest.spyOn(service, 'findOne');
      const result = await controller.findOne(id);

      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters', async () => {
      const id = '60c72b2f9b1d8b2bad72715a';
      const dto: UpdateStudentDto = { name: 'John Updated' };
      const updateSpy = jest.spyOn(service, 'update');
      const result = await controller.update(id, dto);

      expect(updateSpy).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct ID', async () => {
      const id = '60c72b2f9b1d8b2bad72715a';
      const removeSpy = jest.spyOn(service, 'remove');
      const result = await controller.remove(id);

      expect(removeSpy).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockStudent);
    });
  });
});
