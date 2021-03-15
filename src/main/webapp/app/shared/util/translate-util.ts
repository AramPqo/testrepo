import { FormlyFieldConfig } from "@ngx-formly/core";

export function updateExp(formConfig: FormlyFieldConfig[] | any, translate) {
  formConfig.map(item => {
    item.expressionProperties = {
      "templateOptions.label": translate.stream(item.tskey)
    };
  });
}

