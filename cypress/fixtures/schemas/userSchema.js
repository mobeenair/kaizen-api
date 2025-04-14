export const listUsersSchema = {
    type: 'object',
    required: ['page', 'data'],
    properties: {
      page: { type: 'number' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            avatar: { type: 'string' }
          }
        }
      }
    }
  };
  
  export const singleUserSchema = {
    type: 'object',
    required: ['data'],
    properties: {
      data: {
        type: 'object',
        required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
        properties: {
          id: { type: 'number' },
          email: { type: 'string' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          avatar: { type: 'string' }
        }
      }
    }
  };
  
  export const createUserSchema = {
    type: 'object',
    required: ['name', 'job', 'id', 'createdAt'],
    properties: {
      name: { type: 'string' },
      job: { type: 'string' },
      id: { type: 'string' },
      createdAt: { type: 'string' }
    }
  };
  
  export const updateUserSchema = {
    type: 'object',
    required: ['name', 'job', 'updatedAt'],
    properties: {
      name: { type: 'string' },
      job: { type: 'string' },
      updatedAt: { type: 'string' }
    }
  };
  