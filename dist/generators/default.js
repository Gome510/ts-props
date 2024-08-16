function Default({ name, args, argTypes }) {
    return (`
      export default {
        title: '${name}',
        component: ${name}Component,
        argTypes: {
          ${argTypes}
        },
        args: {
          ${args}
        },
      };
    `);
}
export {};
//# sourceMappingURL=default.js.map