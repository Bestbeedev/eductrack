<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TeacherRegistrationPending extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Votre inscription en tant qu\'enseignant est en attente')
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line('Votre inscription en tant qu\'enseignant sur notre plateforme a bien été reçue.')
            ->line('Votre compte est actuellement en attente de validation par l\'administrateur.')
            ->line('Vous recevrez un email avec votre numéro matricule une fois votre compte validé.')
            ->line('Ce numéro matricule vous sera nécessaire pour vous connecter à la plateforme.')
            ->line('Si vous avez des questions, n\'hésitez pas à nous contacter.')
            ->salutation('Cordialement, L\'équipe administrative');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
