import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[compareEqual]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true }]
})
export class CompareValidatorDirective implements Validator {

    private _valueToCompare: any;
    private onNotifyValueChange: () => void;
    @Input('compareEqual')
    set valueToCompare(value: any) {
        if (value !== this._valueToCompare) {
            this._valueToCompare = value;
            let handler = this.onNotifyValueChange;
            if (handler) {
                handler();
            }
        }
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onNotifyValueChange = fn;
    }

    validate(control: AbstractControl): { [key: string]: any } {
        if (this._valueToCompare == null && control.value == null) {
            // Not producing an error if both values are null 
            return null;
        }
        return (control.value !== this._valueToCompare)
            ? { 'compareEqual': true }
            : null;
    }
}