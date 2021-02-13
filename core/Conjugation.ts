export class Conjugation {
    time: string = '';
    radical: string = '';
    firstSingularPerson: string = '';
    secondSingularPerson: string = '';
    thirdSingularPerson: string = '';
    firstPluralPerson: string = '';
    secondPluralPerson: string = '';
    thirdPluralPerson: string = '';

    firstSingularPersonAuxiliary: string = '';
    secondSingularPersonAuxiliary: string = '';
    thirdSingularPersonAuxiliary: string = '';
    firstPluralPersonAuxiliary: string = '';
    secondPluralPersonAuxiliary: string = '';
    thirdPluralPersonAuxiliary: string = '';

    constructor(conjugaison: any) {
        Object.assign(this, conjugaison);
    }
}
