import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    // Inject Student model
    // @InjectModel(Student.name) = dependency injection
    // studentModel = Mongoose model for CRUD operations
  ) {}

  //
  // CREATE
  //
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // Create new document
    const student = new this.studentModel(createStudentDto);
    // new this.studentModel() = create instance
    // Like: new Student(data)
    // Save to database
    return student.save();
    // save() returns Promise<Student>
    // MongoDB generates _id automatically
  }

  //
  // READ ALL
  //
  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
    // find() = get all documents
    // exec() = execute query, return Promise
    // With filter:
    // return this.studentModel.find({ status: 'active' }).exec();
    // With sort:
    // return this.studentModel.find().sort({ name: 1 }).exec();
    // 1 = ascending, -1 = descending
  }

  //
  // READ ONE
  //
  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    // findById() = find by _id field
    if (!student) {
      // Not found → throw exception
      throw new NotFoundException(`Student with ID ${id} not found`);
      // NotFoundException = HTTP 404
      // NestJS automatically handles this
    }
    return student;
  }

  //
  // UPDATE
  //
  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentModel
      .findByIdAndUpdate(
        id, // Which document to update
        updateStudentDto, // New data
        {
          new: true, // Return updated document (not old one)
          runValidators: true, // Run schema validators
        },
      )
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  //
  // DELETE
  //
  async remove(id: string): Promise<Student> {
    const student = await this.studentModel.findByIdAndDelete(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
    // Return deleted document
  }
}
