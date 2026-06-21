import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
// Base route: /students
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  // Dependency injection
  @Post()
  // POST /students
  create(@Body() createStudentDto: CreateStudentDto) {
    // @Body() extracts request body
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  // GET /students
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  // GET /students/:id
  // :id = route parameter
  findOne(@Param('id') id: string) {
    // @Param('id') extracts id from URL
    // Example: /students/abc123 → id = 'abc123'
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  // PATCH /students/:id
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  // DELETE /students/:id
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
