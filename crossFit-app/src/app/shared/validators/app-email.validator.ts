import { ValidatorFn } from "@angular/forms";

export function appEmailvalidator(): ValidatorFn {

    const regEx = new RegExp(`^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$`);

    return (control) => {
        return control.value === '' || regEx.test(control.value)// control.value идва от самата контролкта в HTML  на която го прилагаме;
            ? null
            : { appEmailvalidator: true }
    }
}