import { z } from 'zod';

/**
 * Validation schema for project information
 * Ensures all required fields meet the specified constraints
 */
export const projectInfoSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters')
    .max(50, 'Project name must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9\s-_]+$/,
      'Project name can only contain letters, numbers, spaces, hyphens, and underscores'
    ),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),

  type: z.enum(['Website', 'Web App', 'Mobile App', 'Dashboard', 'E-commerce', 'Portfolio'], {
    errorMap: () => ({ message: 'Please select a valid project type' }),
  }),

  purpose: z.string().min(1, 'Purpose is required'),

  targetAudience: z.string().optional(),

  goals: z.string().optional(),
});

/**
 * Type inference from the Zod schema
 */
export type ProjectInfoValidation = z.infer<typeof projectInfoSchema>;

/**
 * Validation result interface
 * Contains success status, errors, and validated data
 */
export interface ValidationResult<T = unknown> {
  success: boolean;
  errors?: Record<string, string[]>;
  data?: T;
}

/**
 * Helper function to convert Zod errors to ValidationResult format
 */
export function parseValidationErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(err.message);
  });

  return errors;
}

/**
 * Validates project info and returns a ValidationResult
 */
export function validateProjectInfo(data: unknown): ValidationResult<ProjectInfoValidation> {
  try {
    const validatedData = projectInfoSchema.parse(data);
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: parseValidationErrors(error),
      };
    }
    return {
      success: false,
      errors: { _general: ['An unexpected validation error occurred'] },
    };
  }
}
