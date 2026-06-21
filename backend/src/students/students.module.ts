import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student, StudentSchema } from './schemas/student.schema';

@Module({
  imports: [
    //
    // REGISTER SCHEMA
    //
    MongooseModule.forFeature([
      // forFeature = register schema in this module
      {
        name: Student.name, // Model name: "Student"
        schema: StudentSchema, // The schema we created
      },
    ]),
    // After this, we can inject Student model in service
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
