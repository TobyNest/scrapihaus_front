export class FormValidationError extends Error {
    field?: string

    constructor(message: string, field?: string) {
        super(message)
        this.name = 'FormValidationError'
        this.field = field
    }
}