export class SendEmailDto {
    to: string

    attachments?: Record<string, any>[]

    template: string

    data: Record<string, any>
}
