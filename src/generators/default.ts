type Props = {
  name: string;
  args: string;
  argTypes: string;
}

function Default({name, args, argTypes}:Props){
  return (
    `
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
    `
  )
}