import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getModelToken } from '@nestjs/mongoose';
import { Student } from './schemas/student.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

describe('StudentsService', () => {
  let service: StudentsService;

  // 1. Sesuaikan mock data agar memiliki property asli sesuai skema Anda (dari log Jest)
  const mockStudent = {
    nim: '23.11.5001',
    name: 'Ahmad Santoso',
    email: 'ahmad@student.amikom.ac.id',
    class: 'IF-A',
    year: 2023,
    gpa: 3.75,
    status: 'active',
  };

  // Objek tiruan untuk menyimpan riwayat pemanggilan fungsi .save()
  const mockSave = jest.fn().mockResolvedValue(mockStudent);

  // 2. Buat struktur factory agar ESLint mengenali tipenya tanpa memicu error "unsafe"
  const mockStudentModelFactory = jest.fn().mockImplementation(() => ({
    ...mockStudent,
    save: mockSave,
  })) as unknown as Record<string, any>;

  // Definisikan method-method query Mongoose chain dengan pengetikan Jest yang aman
  const mockQuery = {
    exec: jest.fn().mockResolvedValue(mockStudent),
  };

  const mockQueryArray = {
    exec: jest.fn().mockResolvedValue([mockStudent]),
  };

  // Pasangkan fungsi-fungsi statis ke factory utama
  Object.assign(mockStudentModelFactory, {
    find: jest.fn().mockReturnValue(mockQueryArray),
    findById: jest.fn().mockReturnValue(mockQuery),
    findByIdAndUpdate: jest.fn().mockReturnValue(mockQuery),
    findByIdAndDelete: jest.fn().mockReturnValue(mockQuery),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getModelToken(Student.name),
          useValue: mockStudentModelFactory, // Menggunakan factory yang sudah aman dari ESLint
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a student', async () => {
      // 3. Masukkan properti lengkap DTO Anda agar compiler TypeScript tidak mengeluh
      const dto: CreateStudentDto = {
        nim: '23.11.5001',
        name: 'Ahmad Santoso',
        email: 'ahmad@student.amikom.ac.id',
        class: 'IF-A',
        year: 2023,
        gpa: 3.75,
        status: 'active',
      };

      const result = await service.create(dto);

      expect(mockStudentModelFactory).toHaveBeenCalledWith(dto);
      expect(mockSave).toHaveBeenCalled();
      // Pastikan hasil kembalian murni data student tanpa fungsi .save bawaan
      expect(result).toEqual(mockStudent);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockStudent]);
    });
  });

  describe('findOne', () => {
    it('should return a single student if found', async () => {
      const result = await service.findOne('65e1234567890abcdef12345');
      expect(result).toEqual(mockStudent);
    });

    it('should throw NotFoundException if student does not exist', async () => {
      // Melakukan mock per-kasus secara aman tanpa melanggar ESLint type-check
      jest.spyOn(mockStudentModelFactory, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findOne('wrong-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the student if found', async () => {
      const result = await service.update('65e1234567890abcdef12345', {
        gpa: 3.9,
      });
      expect(result).toEqual(mockStudent);
    });

    it('should throw NotFoundException if student to update does not exist', async () => {
      jest
        .spyOn(mockStudentModelFactory, 'findByIdAndUpdate')
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(null),
        } as any);

      await expect(service.update('wrong-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete and return the student if found', async () => {
      const result = await service.remove('65e1234567890abcdef12345');
      expect(result).toEqual(mockStudent);
    });

    it('should throw NotFoundException if student to delete does not exist', async () => {
      jest
        .spyOn(mockStudentModelFactory, 'findByIdAndDelete')
        .mockReturnValueOnce({
          exec: jest.fn().mockResolvedValue(null),
        } as any);

      await expect(service.remove('wrong-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
