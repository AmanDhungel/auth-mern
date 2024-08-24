import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailTrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [{email}]
    
    try {
    const response = await mailTrapClient.send({
        from: sender,
        to: recipient,
        subject: 'Verify your email',
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        category: "Email Verification"
    })
    console.log("Email sent successfully", response);
    }catch(err){
    console.log("Error", err.message);
    throw new Error(`Error sending mail${err}`)
    }
}

export const sendWelcomeMail = async(email, name) => {
    const recipient = [{email}];
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "228376e3-90ce-4282-9b18-8981d1f472c5",
            template_variables: {
              "name": name
            }
        })
        console.log('Email send successfully', response);
    }catch(err){
        console.log("Error", err.message);
        throw new Error(`Error sending mail${err}`)
        }
}

export const sendForgotPasswordMail = async(email, resetUrl) => {
    const recipient = [{email}];
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Reset Password"
        })
        console.log('Email send successfully', response);
    }catch(err){
        console.log("Error", err.message);
        throw new Error(`Error sending mail${err}`)
        }
}

export const sendResetPasswordMail = async(email) => {
    const recipient = [{email}];
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Successful Reset Password',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Successful Reset Password"
        })
        console.log('Email send successfully', response);
    }catch(err){
        console.log("Error", err.message);
        throw new Error(`Error sending mail${err}`)
        }
}