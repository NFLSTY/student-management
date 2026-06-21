//
// STUDENT SCHEMA - MongoDB Document Structure
//
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//
// SCHEMA DECORATOR
//
@Schema({ timestamps: true })
// @Schema() marks this as Mongoose schema
// timestamps: true → Auto-create createdAt & updatedAt
export class Student extends Document {
  // extends Document → Mongoose document methods
  // (_id, save(), remove(), etc)
  //
  // FIELDS / PROPERTIES
  //
  @Prop({ required: true, unique: true })
  // @Prop() decorator defines field
  // required: true → Must be provided
  // unique: true → No duplicates (index created)
  nim: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  class: string;
  @Prop({ required: true })
  year: number;
  @Prop({
    required: true,
    min: 0, // Minimum value
    max: 4, // Maximum value
  })
  gpa: number;
  @Prop({
    required: true,
    enum: ['active', 'graduated', 'dropout'], // Only these values allowed
    default: 'active', // Default if not provided
  })
  status: string;
  // timestamps: true auto-creates:
  // createdAt: Date
  // updatedAt: Date
}

//
// CREATE SCHEMA
//
export const StudentSchema = SchemaFactory.createForClass(Student);
// Convert class to Mongoose schema
// This schema is what we register in module
