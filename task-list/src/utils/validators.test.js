import { validateTask } from './validators';

describe('validateTask', () => {
  it('should return error for missing title', () => {
    const task = { title: '', description: '', dueDate: '' };
    const result = validateTask(task);
    expect(result.title).toBe('Title is required');
  });

  it('should return error for long title', () => {
    const longTitle = 'a'.repeat(101);
    const result = validateTask({ title: longTitle, description: '', dueDate: '' });
    expect(result.title).toMatch(/under 100 characters/);
  });

  it('should return no errors for valid task', () => {
    const task = { title: 'Task 1', description: '', dueDate: '2025-06-04' };
    const result = validateTask(task);
    expect(result).toEqual({});
  });
});
