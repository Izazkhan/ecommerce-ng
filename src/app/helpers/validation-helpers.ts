import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class ValidationHelper {
    constructor() { }
    
    hasError(form: FormGroup, field: string, errorKey?: string): boolean {
        const control = form.get(field);
        if (control && control.errors) {
            if (errorKey) {
                return control.hasError(errorKey);
            }
            console.log(field, 'Here', control.errors);
            return true; // Error
        }
        return false;
    }

    isTouchedOrDirty(form: FormGroup,control: AbstractControl): boolean {
        return control.dirty || form.touched
    }
}