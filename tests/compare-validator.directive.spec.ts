import { async, inject, TestBed, withModule } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { CompareValidatorDirective } from 'angular-compare-validator/compare-validator.directive';

class MockAbstractControl extends AbstractControl {
    private _value: string;
    constructor() {
        super(null, null);
    }
    setValue(value, options?): void { this._value = value }
    patchValue(value, options?): void { throw new Error('Not supported in mock') }
    reset(value?, options?): void { throw new Error('Not supported in mock') }
}

describe('CompareValidatorDirective',
    () => {

        let directive: CompareValidatorDirective;
        let control: AbstractControl;

        beforeEach(() => {
            directive = new CompareValidatorDirective();
            control = new MockAbstractControl();
        });

        it('can be instantiated',
            () => {
                let directive = new CompareValidatorDirective();
                expect(directive instanceof CompareValidatorDirective).toBeTruthy();
            });

        describe('validate',
            () => {

                it('returns no error when both values are null',
                    () => {
                        directive.valueToCompare = null;
                        var validationResult = directive.validate(control);
                        expect(validationResult).toBeNull();
                    });

                it('returns error when only source is null',
                    () => {
                        control.setValue('NotNull');
                        var validationResult = directive.validate(control);
                        expect(validationResult).not.toBeNull();
                        expect(validationResult['compareEqual']).toBeTruthy();
                        expect(true).toBeTruthy();
                    });

                it('returns error when only destination is null',
                    () => {
                        directive.valueToCompare = 'NotNull';
                        var validationResult = directive.validate(control);
                        expect(validationResult).not.toBeNull();
                        expect(validationResult['compareEqual']).toBeTruthy();
                    });

                it('returns error when source and destination are different',
                    () => {
                        control.setValue('NotNull');
                        directive.valueToCompare = 'CertainlyNotNullEither';
                        var validationResult = directive.validate(control);
                        expect(validationResult).not.toBeNull();
                        expect(validationResult['compareEqual']).toBeTruthy();
                    });

                it('returns error when source and destination are complex objects but different',
                    () => {
                        control.setValue({ name: 'Bob', age: 23 });
                        directive.valueToCompare = { name: 'Bob', age: 23 };
                        var validationResult = directive.validate(control);
                        expect(validationResult).not.toBeNull();
                        expect(validationResult['compareEqual']).toBeTruthy();
                    });

                it('returns no error when source and destination are the same string',
                    () => {
                        control.setValue('Password');
                        directive.valueToCompare = 'Password';
                        var validationResult = directive.validate(control);
                        expect(validationResult).toBeNull();
                    });

                it('returns no error when source and destination are the same object',
                    () => {
                        var comparisonData = { name: 'Bob', age: 23 };
                        control.setValue(comparisonData);
                        directive.valueToCompare = comparisonData;
                        var validationResult = directive.validate(control);
                        expect(validationResult).toBeNull();
                    });

            });

        describe('registerOnValidatorChange',
            () => {

                it('returns no error when handle is null',
                    () => {
                        var errorCatched = false;
                        try {
                            directive.validate(control);
                        } catch (e) {
                            errorCatched = true;
                        }
                        expect(errorCatched).toBeFalsy();
                    });

                it('is called when the input property is changed',
                    () => {
                        let validatorChangeCalled = false;
                        directive.registerOnValidatorChange(() => validatorChangeCalled = true);
                        expect(validatorChangeCalled).toBeFalsy();
                        directive.valueToCompare = 'some new value';
                        expect(validatorChangeCalled).toBeTruthy();
                    });

                it('is not called when the input property is set to the same value',
                    () => {
                        directive.valueToCompare = 'some value';
                        let validatorChangeCalled = false;
                        directive.registerOnValidatorChange(() => validatorChangeCalled = true);
                        expect(validatorChangeCalled).toBeFalsy();
                        directive.valueToCompare = 'some value';
                        expect(validatorChangeCalled).toBeFalsy();
                    });

                it('allows only a single listener to be attached',
                    () => {
                        let validatorChangeCalled1 = false;
                        let validatorChangeCalled2 = false;
                        directive.registerOnValidatorChange(() => validatorChangeCalled1 = true);
                        directive.registerOnValidatorChange(() => validatorChangeCalled2 = true);
                        expect(validatorChangeCalled1).toBeFalsy();
                        expect(validatorChangeCalled2).toBeFalsy();
                        directive.valueToCompare = 'some new value';
                        expect(validatorChangeCalled1).toBeFalsy();
                        expect(validatorChangeCalled2).toBeTruthy();
                    });

            });
    });