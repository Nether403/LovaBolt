import { z } from 'zod';

/**
 * Zod validation schema for project information
 *
 * Defines validation rules for all project setup fields with comprehensive constraints:
 * - name: 3-50 characters, alphanumeric with spaces, hyphens, and underscores
 * - description: 10-500 characters
 * - type: Must be one of the predefined project types
 * - purpose: Required, minimum 1 character
 * - targetAudience: Optional field
 * - goals: Optional field
 *
 * @example
 * ```tsx
 * import { projectInfoSchema } from './validation';
 *
 * try {
 *   const validData = projectInfoSchema.parse({
 *     name: 'My Portfolio',
 *     description: 'A personal portfolio website',
 *     type: 'Website',
 *     purpose: 'Portfolio'
 *   });
 *   console.log('Valid!', validData);
 * } catch (error) {
 *   console.error('Validation failed:', error);
 * }
 * ```
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
 * Converts Zod validation errors to a structured error format
 *
 * Transforms Zod's error array into a more convenient object structure where
 * each field path maps to an array of error messages for that field.
 *
 * @param error - The ZodError object from a failed validation
 * @returns An object mapping field paths to arrays of error messages
 *
 * @example
 * ```tsx
 * try {
 *   projectInfoSchema.parse(data);
 * } catch (error) {
 *   if (error instanceof z.ZodError) {
 *     const errors = parseValidationErrors(error);
 *     console.log(errors);
 *     // { "name": ["Project name must be at least 3 characters"] }
 *   }
 * }
 * ```
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
 * Validates project information against the defined schema
 *
 * Performs comprehensive validation of project data including name, description,
 * type, and purpose. Returns a structured result indicating success or failure
 * with detailed error messages.
 *
 * @param data - The project data to validate (typically from form input)
 * @returns A ValidationResult object containing:
 *   - success: boolean indicating if validation passed
 *   - data: validated and typed data (only present if success is true)
 *   - errors: object mapping field names to error messages (only present if success is false)
 *
 * @example
 * ```tsx
 * const result = validateProjectInfo({
 *   name: 'My Project',
 *   description: 'A great project',
 *   type: 'Website',
 *   purpose: 'Portfolio'
 * });
 *
 * if (result.success) {
 *   console.log('Valid data:', result.data);
 * } else {
 *   console.log('Validation errors:', result.errors);
 *   // { "name": ["Project name must be at least 3 characters"] }
 * }
 * ```
 *
 * @remarks
 * This function never throws - all errors are caught and returned in the result object.
 * Unexpected errors are mapped to a general error message under the '_general' key.
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
