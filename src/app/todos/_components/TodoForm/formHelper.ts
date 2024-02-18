const fieldMessages = {
   required: 'Todo name is required',
   pattern: 'Only letters are allowed in Todo name',
   minLength: 'Todo name must be at least 3 characters long',
   maxLength: 'Todo name must be at most 35 characters long',
};

export const fieldConstraints = {
   name: {
      pattern: {
         value: /^[a-zA-Z ]+$/,
         message: fieldMessages.pattern,
      },
      required: fieldMessages.required,
      minLength: {
         value: 3,
         message: fieldMessages.minLength,
      },
      maxLength: {
         value: 35,
         message: fieldMessages.maxLength,
      },
   },
};
