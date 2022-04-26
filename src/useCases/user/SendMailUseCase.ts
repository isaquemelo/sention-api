import sendgrid from '@sendgrid/mail'

import { env } from 'process';

import NotificationTrigger from '../../entities/NotificationTrigger'


export default class SendMailUseCase {
    private sender: sendgrid.MailService

    constructor() {
        this.sender = sendgrid
        this.sender.setApiKey(<string>env.SENDGRID_API_KEY)
    }

    async execute(notificationTrigger: NotificationTrigger, targetMail: string): Promise<void> {
        const email = {
            from: <string>env.EMAIL_SENDER,
            to: targetMail,
            subject: notificationTrigger.name,
            text: notificationTrigger.content,
        };

        this.sender.send(email)
            .then(() => {
                console.info(`SendMailUseCase: Email sent to ${targetMail}`)
            })
            .catch((error) => {
                console.error(error)
            })
    }

}
