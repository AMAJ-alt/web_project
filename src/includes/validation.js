import {
  Form as veeForm,
  Field as veeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('veeForm', veeForm);
    app.component('veeField', veeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);

    configure({
      generateMessage: (ctx) => {
        const msg = {
          required: 'این فیلد اجباری است. ',
          min: 'حداقل 3 کاراکتر لازم است. ',
          max: 'حداکثر 100 کاراکتر لازم است. ',
        };
        const message = msg[ctx.rule.name]
          ? msg[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
