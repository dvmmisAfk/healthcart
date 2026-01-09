interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // In production, this would be a real email service API call
    console.log('Sending email:', {
      to: 'akshatthakur823@gmail.com',
      subject: data.subject,
      body: data.body
    });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};