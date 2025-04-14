export const singleResourceSchema = {
    type: 'object',
    required: ['data'],
    properties: {
      data: {
        type: 'object',
        required: ['id', 'name', 'year', 'color', 'pantone_value'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          year: { type: 'number' },
          color: { type: 'string', pattern: '^#' },
          pantone_value: { type: 'string' }
        }
      }
    }
  };
  
  export const listResourceSchema = {
    type: 'object',
    required: ['page', 'per_page', 'total', 'total_pages', 'data'],
    properties: {
      page: { type: 'number' },
      per_page: { type: 'number' },
      total: { type: 'number' },
      total_pages: { type: 'number' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'name', 'year', 'color', 'pantone_value'],
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            year: { type: 'number' },
            color: { type: 'string', pattern: '^#' },
            pantone_value: { type: 'string' }
          }
        }
      }
    }
  };
  